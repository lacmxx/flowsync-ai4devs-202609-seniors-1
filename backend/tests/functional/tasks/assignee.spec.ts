import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: el nombre y las iniciales bastan para
 * identificarlo, ningún otro dato de la cuenta se expone junto a la tarea
 * (en particular el email, que `TaskTransformer` llegó a filtrar al delegar
 * en `UserTransformer` en vez de en `TaskAssigneeTransformer`), y una cuenta
 * sin nombre sigue dando iniciales sin recurrir al email.
 *
 * El scenario "no filtra datos de cuenta" habla explícitamente de "cualquier
 * tarea, suelta o dentro de la lista", así que cada comprobación recorre los
 * cuatro endpoints que devuelven una tarea: crear, listar, consultar suelta y
 * cambiar el estado.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any, fullName: string | null, email = 'ada@example.com') {
    await User.create({ fullName, email, password: 'secreto123' })

    const login = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return login.body().data.token as string
  }

  /**
   * El mismo responsable, visto a través de los cuatro endpoints que
   * devuelven una tarea. Centraliza la creación para que cada test se quede
   * solo con las aserciones que le importan a su scenario.
   */
  async function assigneesDeLosCuatroEndpoints(client: any, token: string) {
    const auth = (req: any) => req.header('Authorization', `Bearer ${token}`)

    const creada = await auth(client.post('/api/v1/tasks').json({ title: 'Revisar el informe' }))
    const id = creada.body().data.id

    const enLista = await auth(client.get('/api/v1/tasks'))
    const tareaEnLista = enLista.body().data.find((tarea: any) => tarea.id === id)

    const suelta = await auth(client.get(`/api/v1/tasks/${id}?today=2026-01-01`))

    const trasCambioDeEstado = await auth(
      client.patch(`/api/v1/tasks/${id}/status`).json({ status: 'in_progress' })
    )

    return {
      'al crearla': creada.body().data.assignee,
      'en la lista': tareaEnLista.assignee,
      'suelta': suelta.body().data.assignee,
      'tras cambiar su estado': trasCambioDeEstado.body().data.assignee,
    }
  }

  test('el assignee trae el nombre y las iniciales del responsable', async ({ client, assert }) => {
    const token = await sesion(client, 'Ada Lovelace')
    const assignees = await assigneesDeLosCuatroEndpoints(client, token)

    for (const [donde, assignee] of Object.entries(assignees)) {
      assert.equal(assignee.fullName, 'Ada Lovelace', `fullName (${donde})`)
      assert.equal(assignee.initials, 'AL', `initials (${donde})`)
    }
  })

  test('el assignee no incluye el email de la cuenta ni ningún otro dato de acceso', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, 'Ada Lovelace')
    const assignees = await assigneesDeLosCuatroEndpoints(client, token)

    for (const [donde, assignee] of Object.entries(assignees)) {
      // Exactos y no solo "sin email": así una fecha de la cuenta que se
      // cuele por otro campo también haría caer el test.
      assert.sameMembers(Object.keys(assignee), ['id', 'fullName', 'initials'], donde)
    }
  })

  test('una cuenta sin nombre sigue dando iniciales en el assignee de la tarea', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, null)
    const assignees = await assigneesDeLosCuatroEndpoints(client, token)

    for (const [donde, assignee] of Object.entries(assignees)) {
      assert.isNull(assignee.fullName, `fullName (${donde})`)
      assert.isString(assignee.initials, `initials (${donde})`)
      assert.isNotEmpty(assignee.initials, `initials (${donde})`)
    }
  })
})

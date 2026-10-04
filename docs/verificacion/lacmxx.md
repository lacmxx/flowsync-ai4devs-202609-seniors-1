## Lo que cada tarea muestra de su responsable — 3 escenarios, 3 cubiertos

| Escenario | Test que lo cubre | Estado | Test creado para llegar a cubierto |
|---|---|---|---|
| **Responsable identificable** — al obtener una tarea, su `assignee` trae el nombre y las iniciales del responsable |  Ninguno. TaskAssigneeTransformer (backend/app/transformers/task_assignee_transformer.ts) nunca se ejerce desde un test. | ❌ NO cubierto | `backend/tests/functional/tasks/assignee.spec.ts` — "el assignee trae el nombre y las iniciales del responsable" |
| **La tarea no filtra datos de cuenta** — al obtener cualquier tarea, suelta o dentro de la lista, su `assignee` no incluye el email ni ningún otro dato de la cuenta |  Ninguno. No hay ningún test que golpee un endpoint de tareas y aserte sobre la forma del assignee. | ❌ NO cubierto | `backend/tests/functional/tasks/assignee.spec.ts` — "el assignee no incluye el email de la cuenta ni ningún otro dato de acceso" |
| **Responsable sin nombre** — si el responsable es una cuenta sin nombre, el `assignee` llega con `fullName` nulo y sus iniciales igualmente presentes | Ninguno directo sobre tareas. Indirecto: `backend/tests/functional/auth/initials.spec.ts` prueba el mismo cálculo de iniciales, pero vía `POST /auth/login`, no vía una tarea | ⚠️ NO cubierto | `backend/tests/functional/tasks/assignee.spec.ts` — "una cuenta sin nombre sigue dando iniciales en el assignee de la tarea" |

Escenarios cubiertos antes de empezar: 0 - 3

Escenarios en el que no se sabia si faltaba o no un test: Responsable sin nombre porque se debe obtener las iniciales y no se especifica claramente como.

Algo que en el escenario no determinaba y se tuvo que decidir al escribir un test: Al no tener un nombre no queda claro como 
calcular las iniciales. En este caso se optó por la misma opción que el cálculo de las iniciales desde auth que es calcularla utilizando el mail.
# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Lee los scenarios del requisito "Lo que cada tarea muestra de su responsable" de la spec viva de tasks y los tests existentes.
Genera una tabla de trazabilidad: cada criterio de aceptación → qué prueba lo cubre → cubierto / NO cubierto.
No cambies nada y limítate a este requisito.
```

**Qué salió:** (opcional, una línea) funcionó a la primera.


## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Almacena la matriz de trazabilidad creada en el documento docs/verificacion/lacmxx.md. El contenido será el siguiente: 
1. una línea indicando el bombre del requisito y dos números: cuantos escenarios tiene el requisito y cuantos resultaron cubiertos
2. Después una tabla con el siguiente formato:
- una fila por escenario y cuatro columnas, 
- columna 1 - el escenario en una línea qué se espera y en que situación.
- columna 2 - test que lo cubre
- columna 3 - el estado
- columna 4 - de momento vacía
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Invoca al agente 'code-adversarial-reviewer' para que valide la suficiencia de estos tests faltantes detectados 
en los escenarios del requisito "Lo que cada tarea muestra de su responsable" de la spec vida de tasks. 
Limitate a los requisitos de este escenario ("Responsable identificable", "La tarea no filtra datos de cuenta", "Responsable sin nombre").
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Arregla el hallazgo crítico: La tarea no filtra datos de cuenta en backend/app/transformers/task_transformer.ts
y añade los tests necesarios que cubran los huecos detectados en "Responsable identificable" y "Responsable sin nombre". 
Los tests deben ir en la carpeta backend/tests/functional/tasks/
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
En la tabla de trazabilidad del documento docs/verificacion/lacmxx.md añade una columna final 
indicando el test que se ha creado para llegar al estado cubierto
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

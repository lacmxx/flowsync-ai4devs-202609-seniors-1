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
Analiza el proyecto y descubre las capacidades funcionales que están realmente implementadas. Genera una especificación SDD que documente su comportamiento actual, basándote exclusivamente en evidencias del código y las pruebas existentes.

Utiliza exactamente esta estructura:

## Purpose
Una o dos frases que expliquen para qué existe la capacidad.

## Requirements
### Requirement: [Nombre]
El sistema SHALL [comportamiento observable].

#### Scenario: [Nombre]
- **WHEN** [acción y precondiciones].
- **THEN** [resultado observable].

Escribe en castellano, conservando los encabezados y las palabras SHALL, WHEN y THEN. Documenta tanto los escenarios positivos como los negativos que estén implementados.

No inventes funcionalidades ni describas comportamientos deseados. No utilices vocabulario de deltas ni incluyas detalles de implementación, nombres de clases o archivos. En el backend, describe peticiones y respuestas; en la interfaz, lo que el usuario ve y puede hacer.

Si no puedes verificar un comportamiento, no lo presentes como un hecho.
```

**Qué salió:** funcionó a la primera

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Guarda esta spec en docs/spec-vida/lacmxx.md
```

**Qué salió:** funcionó a la primera

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
como desarrollador experto en AdonisJS 7, Lucid 22, SQLite, React 19 y Vite cuestiona todo lo que creas que es contradictorio entre la spec generada y lo que hace el código. Incluso puedes lanzar tests para ver si coincide lo observable con lo detallado en la spec
No corrijas la spec, solo di las contradicciones que encuentres
```

**Qué salió:** funcionó a la primera

# MANUAL BÁSICO DE GIT Y CÓMO USARLO EN EL PROYECTO

## 1. Iniciación y Clonación de un Repositorio

- **Inicializar un repositorio en un proyecto existente:**
    ```bash
    git init
    ```
  
- **Clonar un repositorio existente desde GitHub:**
    ```bash
    git clone <url-del-repositorio>
    ```

## 2. Gestión de Ramas

### 2.1 Ver Ramas

- **Ver las ramas locales (las ramas son como espacios de trabajo):**
    ```bash
    git branch
    ```

- **Ver las ramas remotas:**
    ```bash
    git branch -r
    ```

- **Ver todas las ramas (locales y remotas):**
    ```bash
    git branch -a
    ```
    - Al hacer `git branch -r` podrás ver la rama que he creado, la cual se llama `mimika`, y en esta se encuentran los apuntes y correcciones.

### 2.2 Crear y Cambiar de Ramas

- **Crear una nueva rama y cambiar a ella:**
    ```bash
    git checkout -b <nombre-de-la-rama>
    ```

- **Cambiar a una rama existente (esto es lo que usarás para acceder a mi rama):**
    ```bash
    git checkout <nombre-de-la-rama>
    ```

### 2.3 Renombrar Ramas

- **Renombrar la rama actual:**
    ```bash
    git branch -m <nuevo-nombre>
    ```

- **Renombrar una rama específica:**
    ```bash
    git branch -m <nombre-antiguo> <nuevo-nombre>
    ```

### 2.4 Eliminar Ramas

- **Eliminar una rama local:**
    ```bash
    git branch -d <nombre-de-la-rama>
    ```
  
    Si la rama no ha sido fusionada, usa `-D` para forzar la eliminación:
    ```bash
    git branch -D <nombre-de-la-rama>
    ```

- **Eliminar una rama remota:**
    ```bash
    git push origin --delete <nombre-de-la-rama>
    ```

## 3. Trabajando con Ramas Remotas

### 3.1 Obtener (fetch) y Fusionar (merge) Cambios

- **Obtener los últimos cambios de la rama remota (sin fusionarlos):**
    ```bash
    git fetch origin
    ```

- **Fusionar una rama remota en la rama actual:**
    ```bash
    git merge origin/<nombre-de-la-rama>
    ```

- **Traer y fusionar automáticamente la rama remota con la rama actual:**
    ```bash
    git pull origin <nombre-de-la-rama>
    ```

### 3.2 Subir Cambios a una Rama Remota

- **Subir la rama actual al repositorio remoto:**
    ```bash
    git push origin <nombre-de-la-rama>
    ```

- **Subir una nueva rama y configurarla para hacer push automáticamente en el futuro:**
    ```bash
    git push -u origin <nombre-de-la-rama>
    ```

## 4. Fusionando Ramas (Merge)

- **Fusionar una rama en la rama actual:**
    ```bash
    git merge <nombre-de-la-rama>
    ```
    Esto traerá los cambios de `<nombre-de-la-rama>` a la rama en la que te encuentras actualmente.

## 5. Resolviendo Conflictos

- Si hay conflictos durante una fusión, Git te lo notificará. Para resolver conflictos:

  1. Edita los archivos conflictivos para resolver los conflictos manualmente.
  2. Después de resolver los conflictos, añade los archivos resueltos:
     ```bash
     git add <archivo-conflictivo>
     ```
  3. Finaliza la fusión con:
     ```bash
     git commit
     ```

## 6. Comandos de Estado y Deshacer Cambios

- **Ver el estado de los cambios actuales:**
    ```bash
    git status
    ```

- **Descartar cambios no confirmados en un archivo:**
    ```bash
    git checkout -- <archivo>
    ```

- **Revertir el último commit (manteniendo los cambios en el área de trabajo):**
    ```bash
    git reset --soft HEAD^
    ```

- **Revertir el último commit (eliminando los cambios):**
    ```bash
    git reset --hard HEAD^
    ```

## 7. Ver el Historial de Cambios

- **Ver el historial de commits:**
    ```bash
    git log
    ```

- **Ver un historial resumido (una línea por commit):**
    ```bash
    git log --oneline
    ```

- **Ver un historial gráfico con ramas:**
    ```bash
    git log --oneline --graph --all
    ```

---

Este manual te servirá como una guía básica para manejar las ramas en Git, realizar cambios, subirlos al repositorio remoto, y mantener un flujo de trabajo organizado. Con estos comandos, estarás preparado para trabajar eficazmente en proyectos colaborativos utilizando Git.

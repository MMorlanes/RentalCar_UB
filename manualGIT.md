# Manual Básico de Git: Gestión de Ramas

Este manual te guiará a través de los comandos básicos de Git para manejar ramas. Aprenderás a cambiar de rama, crear nuevas ramas, ver las ramas existentes y más.

## Tabla de Contenidos
1. [Ver las ramas existentes](#ver-las-ramas-existentes)
2. [Crear una nueva rama](#crear-una-nueva-rama)
3. [Cambiar de rama](#cambiar-de-rama)
4. [Crear una nueva rama desde otra](#crear-una-nueva-rama-desde-otra)
5. [Unir (merge) una rama con otra](#unir-merge-una-rama-con-otra)
6. [Eliminar una rama](#eliminar-una-rama)
7. [Publicar una rama en un repositorio remoto](#publicar-una-rama-en-un-repositorio-remoto)

## 1. Ver las ramas existentes

Para ver todas las ramas en tu repositorio, usa el siguiente comando:

```bash
git branch

Este comando mostrará una lista de las ramas locales. La rama en la que te encuentras actualmente estará precedida por un *.

Si quieres ver las ramas remotas también, puedes usar:
git branch -a

2. Crear una nueva rama
Para crear una nueva rama llamada nombre-de-la-rama, usa el siguiente comando:
git branch nombre-de-la-rama
Este comando crea la rama pero no cambia a ella inmediatamente. Si quieres crear y cambiarte a la nueva rama de una vez, puedes usar:
git checkout -b nombre-de-la-rama
git checkout -b nombre-de-la-rama

3. Cambiar de rama
Para cambiar a una rama existente, usa:
git checkout nombre-de-la-rama
Esto te moverá a la rama especificada.

4. Crear una nueva rama desde otra
Si deseas crear una nueva rama basada en una rama específica, primero asegúrate de estar en la rama desde la que quieres partir:
git checkout rama-existente
Luego, crea y cámbiate a la nueva rama:
git checkout -b nueva-rama
Esto crea la nueva rama nueva-rama a partir de rama-existente.


5. Unir (merge) una rama con otra
Para combinar el trabajo de una rama en otra, primero asegúrate de estar en la rama de destino (donde quieres hacer la combinación):
git checkout rama-destino

Luego, ejecuta el siguiente comando para fusionar la rama rama-a-unir en rama-destino:
git merge rama-a-unir

6. Eliminar una rama
Si ya no necesitas una rama, puedes eliminarla usando:
git branch -d nombre-de-la-rama

Este comando eliminará la rama si ha sido completamente fusionada con la rama actual. Si no lo ha sido y aún quieres eliminarla, usa:
git branch -D nombre-de-la-rama

7. Publicar una rama en un repositorio remoto
Para subir una rama a un repositorio remoto, usa el siguiente comando:
git push origin nombre-de-la-rama

Esto creará la rama en el remoto si no existe y subirá los commits locales.


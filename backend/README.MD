## 🔧 Pasos para crear tu entorno correctamente

Instala el módulo venv (si no está ya):

    sudo apt install python3.12-venv


Crea un entorno virtual dentro de tu proyecto:

    python3 -m venv venv


// Esto creará una carpeta venv/ con todo lo necesario.

Activa el entorno virtual:

    source venv/bin/activate

### Extra (si más adelante quieres salir del entorno)

Para desactivarlo:

    deactivate


Para volver a activarlo:

    source venv/bin/activate


para instalar todos los requerimientos:

    pip install -r requeriments.txt
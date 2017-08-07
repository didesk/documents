## Para arrancar el sitema de debug asociado a chrome desde la consola de node:

`
 node --debug-brk  --inspect deb.js 
`

## Para arrancar nodemon y poder ver en tiempo real los resultados:

instalar nodemon de manera global antes

` nodemon app.js`

## Paradebuggear usando nodemon:
` --debug-brk mi-file.js` 
y luego hacemos click en el modo de debugger atach to process 

## configuraciones de launch.json
`
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Process",
      "port": 5858
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Node.js Program debugger",
      "program": "${file}",
      "cwd": "${workspaceRoot}"
    }
  ],
  "compounds": []
}
`
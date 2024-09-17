const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
    components: {
      schemas: {
        Alumno: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
            },
            apellido: {
              type: 'string',
            },
            dni: {
              type: 'number',
            },
            email: {
              type: 'string',
            },
            tps: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId del trabajo práctico',
              },
            },
            cursos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId del curso',
              },
            },
          },
        },
        Curso: {
          type: 'object',
          properties: {
            comision: {
              type: 'string',
            },
            horario: {
              type: 'string',
            },
            fechaInicio: {
              type: 'string',
              format: 'date',
            },
            fechaFin: {
              type: 'string',
              format: 'date',
            },
            materia: {
              type: 'string',
              description: 'ObjectId de la Materia',
            },
            alumnos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId del Alumno',
              },
            },
            tps: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId del Trabajo Práctico',
              },
            },
          },
        },
        Calificacion: {
          type: 'object',
          properties: {
            file: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            comentarioAlum: {
              type: 'string',
            },
            devolucionProf: {
              type: 'string',
            },
            calificacion: {
              type: 'number',
            },
            tpId: {
              type: 'string',
              description: 'ObjectId del trabajo práctico',
            },
            alumnoId: {
              type: 'string',
              description: 'ObjectId del alumno',
            },
            grupoId: {
              type: 'string',
              description: 'ObjectId del grupo',
            },
          },
        },
        Profesor: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
            },
            apellido: {
              type: 'string',
            },
            dni: {
              type: 'number',
            },
            email: {
              type: 'string',
            },
            cursos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId del curso',
              },
            },
          },
        },
        Grupo: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
            },
            alumnos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId del Alumno',
              },
            },
            curso: {
              type: 'string',
              description: 'ObjectId del Curso',
            },
          },
        },
        Materia: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
            },
            cursos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId del Curso',
              },
            },
          },
        },
        TrabajoPractico: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del trabajo práctico',
            },
            calificacion: {
              type: 'array',
              items: {
                type: 'number',
                description: 'Calificación del trabajo práctico',
              },
            },
            estado: {
              type: 'string',
              enum: ['Entregado', 'En proceso', 'En preparación'],
              description: 'Estado del trabajo práctico',
            },
            fechaInicio: {
              type: 'string',
              format: 'date',
              description: 'Fecha de inicio del trabajo práctico',
            },
            fechaFin: {
              type: 'string',
              format: 'date',
              description: 'Fecha de finalización del trabajo práctico',
            },
            grupal: {
              type: 'boolean',
              description: 'Indica si el trabajo práctico es grupal',
            },
            grupos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los grupos asignados al trabajo práctico',
              },
            },
            consigna: {
              type: 'string',
              description: 'Consigna del trabajo práctico',
            },
            cuatrimestre: {
              type: 'boolean',
              description: 'Indica si el trabajo práctico pertenece al cuatrimestre actual',
            },
          },
        },
      },
    },
  },
  apis: ['./app/routes/alumno.js', './app/routes/profesor.js', './app/routes/calificacion.js', './app/routes/curso.js', './app/routes/grupo.js', './app/routes/materia.js','./app/routes/trabajopractico.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;
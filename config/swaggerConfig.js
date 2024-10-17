const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de API',
      version: '1.0.0',
      description: 'API para la gestión de alumnos, profesores, cursos, calificaciones y trabajos prácticos de la plataforma Cuaderno de Laboratorio.',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor para desarrollo',
      },
    ],
    components: {
      schemas: {
        Alumno: {
          type: 'object',
          description: 'Representa un alumno inscrito en la plataforma',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del alumno',
            },
            apellido: {
              type: 'string',
              description: 'Apellido del alumno',
            },
            dni: {
              type: 'number',
              description: 'Documento Nacional de Identidad del alumno',
            },
            email: {
              type: 'string',
              description: 'Correo electrónico del alumno',
            },
            tps: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los trabajos prácticos asociados al alumno',
              },
            },
            cursos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los cursos en los que está inscrito el alumno',
              },
            },
          },
        },
        Curso: {
          type: 'object',
          description: 'Representa un curso en la plataforma',
          properties: {
            comision: {
              type: 'string',
              description: 'Comisión asignada al curso',
            },
            horario: {
              type: 'string',
              description: 'Horario del curso',
            },
            fechaInicio: {
              type: 'string',
              format: 'date',
              description: 'Fecha de inicio del curso',
            },
            fechaFin: {
              type: 'string',
              format: 'date',
              description: 'Fecha de finalización del curso',
            },
            materia: {
              type: 'string',
              description: 'ObjectId de la Materia asociada al curso',
            },
            alumnos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los alumnos inscritos en el curso',
              },
            },
            tps: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los trabajos prácticos asignados en el curso',
              },
            },
          },
        },
        Calificacion: {
          type: 'object',
          description: 'Representa la calificación de un alumno en un trabajo práctico',
          properties: {
            file: {
              type: 'array',
              items: {
                type: 'string',
                description: 'Archivos adjuntos entregados por el alumno en el trabajo práctico',
              },
            },
            comentarioAlum: {
              type: 'string',
              description: 'Comentarios del alumno sobre el trabajo entregado',
            },
            devolucionProf: {
              type: 'string',
              description: 'Devolución del profesor sobre el trabajo práctico entregado',
            },
            calificacion: {
              type: 'number',
              description: 'Calificación numérica asignada al trabajo práctico',
            },
            tpId: {
              type: 'string',
              description: 'ObjectId del trabajo práctico',
            },
            alumnoId: {
              type: 'string',
              description: 'ObjectId del alumno evaluado',
            },
            grupoId: {
              type: 'string',
              description: 'ObjectId del grupo del alumno (si aplica)',
            },
          },
        },
        Profesor: {
          type: 'object',
          description: 'Representa a un profesor en la plataforma',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del profesor',
            },
            apellido: {
              type: 'string',
              description: 'Apellido del profesor',
            },
            dni: {
              type: 'number',
              description: 'Documento Nacional de Identidad del profesor',
            },
            email: {
              type: 'string',
              description: 'Correo electrónico del profesor',
            },
            cursos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los cursos en los que el profesor está asignado',
              },
            },
          },
        },
        Grupo: {
          type: 'object',
          description: 'Representa un grupo de alumnos trabajando en un trabajo práctico',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del grupo',
            },
            alumnos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los alumnos que pertenecen al grupo',
              },
            },
            curso: {
              type: 'string',
              description: 'ObjectId del curso al que pertenece el grupo',
            },
          },
        },
        Materia: {
          type: 'object',
          description: 'Representa una materia en la plataforma',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre de la materia',
            },
            cursos: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId de los cursos asociados a la materia',
              },
            },
          },
        },
        TrabajoPractico: {
          type: 'object',
          description: 'Representa un trabajo práctico asignado a los alumnos',
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
              description: 'Estado actual del trabajo práctico',
            },
            fechaInicio: {
              type: 'string',
              format: 'date',
              description: 'Fecha de inicio del trabajo práctico',
            },
            fechaFin: {
              type: 'string',
              format: 'date',
              description: 'Fecha de entrega o finalización del trabajo práctico',
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
              description: 'Descripción o consigna del trabajo práctico',
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
  apis: ['./app/routes/alumno.js', './app/routes/profesor.js', './app/routes/calificacion.js', './app/routes/curso.js', './app/routes/grupo.js', './app/routes/materia.js', './app/routes/trabajopractico.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;
//import elysia
import { Elysia, t } from 'elysia';

//import controller
import { createFile, getFileById, getFiles } from '../controllers/FileController';
 
const Routes = new Elysia({ prefix: '/files' })

  //route get all posts
  .get('/', () => getFiles())

  .post('/', ({ body }) => createFile(body as { filename: string; parent: number | string; typefile: string }), {
    body: t.Object({
        filename: t.String({
            minLength: 3,
            maxLength: 100,
        }),
        parent: t.Union([
            t.Number({
                minimum: 0,
                maximum: 99999, // Atur sesuai kebutuhan batas maksimum ID parent
            }),
            t.String({
                minLength: 1,
                maxLength: 15,
            })
        ]),
        typefile: t.String({
            minLength: 3,
            maxLength: 1000,
        }),
    })
})
.get('/:id', ({params: { id }}) => getFileById(id))

export default Routes;
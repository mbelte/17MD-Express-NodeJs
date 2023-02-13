import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mysql from 'mysql2'


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog'
})

db.connect(function(error) {
  if (error) {
    throw error
  }
  console.log('DB connection successful')
})


const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});


app.get("/posts/:id/comments", (req: Request, res: Response) => {
  const id = req.params.id

  db.query('SELECT * FROM `comments` WHERE `postId` = ?', id, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result)
  })
});

app.get("/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id
  db.query('SELECT `id`,`title`,`content`,`author`,`image` FROM `articles` WHERE `id` = ?', id, (error, result) => {
    if (error) {
      throw error
    }

    if (result[0]) {
      res.send(result[0])
    } else {
      res.sendStatus(404)
    }
  })
});

app.put("/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id
  const { title, content, author, image } = req.body

  const sql = `UPDATE articles SET 
                  title= ?,
                  content= ?,
                  author= ?,
                  image= ? 
                WHERE id = ?`
  db.query(sql, [title, content, author, image, id], (error, result) => {
    if (error) {
      throw error
    }

    if (result) {
      res.send(result[0])
    } else {
      res.send('Not Found!')
    }
    
  })
});

app.get("/posts", (req: Request, res: Response) => {
  db.query('SELECT * FROM `articles` ORDER BY `id` DESC', (error, result) => {
    if (error) {
      throw error
    }
    res.send(result)
  })
});

app.post('/posts', (req: Request, res: Response) => {
  const { title, content, author, image } = req.body

  const sql = 'INSERT INTO `articles` (`title`,`content`,`author`,`image`) VALUES (?)'
  db.query(sql, [[title, content, author, image]], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result)
  })
})

app.post('/comments', (req: Request, res: Response) => {
  const { author, body, postId } = req.body

  const sql = 'INSERT INTO `comments` (`author`,`body`, `postId`) VALUES (?)'
  db.query(sql, [[author, body, postId]], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result)
  })
})

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

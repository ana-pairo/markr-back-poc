# markr-back

Back-end for Markr, a book and read medias marker.

## About

> <h3> Project in development. ⚙️  </h3>

💻 **Tecnologies:**   

<ul><li>Node.js</li>
  <li>Express</li>
  <li>Prisma</li>
  <li>Typescript</li>
</ul>

## Documentation

You can check project's simplified documentation [here](https://valley-beast-e3f.notion.site/Markr-5e1e980280e94501bd17271135800645).

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env` file using the `.env.example` file
5. Run all migrations

```bash
npx prisma migrate dev
```
6. Seed db

```bash
npm run seed
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

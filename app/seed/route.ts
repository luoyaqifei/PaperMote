import { db } from "@vercel/postgres";

const client = await db.connect();

async function createUsersTable() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
}

async function createBooksTable() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS books (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        cover TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
}

async function createNotesTable() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS notes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        book_id UUID NOT NULL,
        FOREIGN KEY (book_id) REFERENCES books (id)
    );
    `;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await createUsersTable();
        await createBooksTable();
        await createNotesTable();
        await client.sql`COMMIT`;
        return Response.json({ message: "Tables created successfully" }, { status: 200 });
    } catch (error) {
        await client.sql`ROLLBACK`;
        console.error(error);
        return Response.json({ message: "Error creating tables", error: error }, { status: 500 });
    }
}

export async function DELETE() {
    await client.sql`DROP TABLE IF EXISTS users`;
    await client.sql`DROP TABLE IF EXISTS books`;
    await client.sql`DROP TABLE IF EXISTS notes`;
    return Response.json({ message: "Tables deleted successfully" }, { status: 200 });
}
import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  author: text('author').notNull(),
  likes: integer('likes').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
})

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull().default(''),
  token: text('token'),
})

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  blogLists: many(blogLists),
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  blogLists: many(blogLists),
}))

export const blogLists = pgTable('bloglists', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  blogId: integer('blog_id')
    .notNull()
    .references(() => blogs.id),
  read: boolean('read').default(false),
})

export const blogListsRelations = relations(blogLists, ({ one }) => ({
  user: one(users, {
    fields: [blogLists.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [blogLists.blogId],
    references: [blogs.id],
  }),
}))

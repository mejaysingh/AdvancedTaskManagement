import conf from '../conf/conf';
import { Client, ID, Databases, Query, DatabaseDocumentList } from "appwrite";

interface Todo {
  $id: string;
  text: string;
  completed: boolean;
  userId: string;
}

export class Service {
  client = new Client();
  databases: Databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async getTodos(userId: string): Promise<DatabaseDocumentList<Todo> | false> {
    console.log('query==', userId);
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal('userId', userId),
        ]
      );
    } catch (error) {
      console.log("Appwrite service :: getTodos :: error", error);
      return false;
    }
  }

  async createTodo({ text, userId, completed = false }: { text: string, userId: string, completed?: boolean }): Promise<Todo | void> {
    console.log('data==', text, 'tt=', userId);
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          text,
          completed,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createTodo :: error", error);
    }
  }

  async updateTodo({ id, text }: { id: string, text: string }): Promise<Todo | void> {
    console.log('api cal==', text, 'tt=', id);
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          text,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateTodo :: error", error);
    }
  }

  async deleteTodo(id: string): Promise<boolean> {
    console.log('api==', id);
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteTodo :: error", error);
      return false;
    }
  }

  async toggleTodo({ id, completed }: { id: string, completed: boolean }): Promise<Todo | void> {
    console.log('api cal==', completed, 'tt=', id);
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          completed,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateTodo :: error", error);
    }
  }
}

const service = new Service();
export default service;

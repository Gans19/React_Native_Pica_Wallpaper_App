import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
// import "react-native-url-polyfill/auto";

export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.gsg.pica",
  projectId: "665bf661002552b8146a",
  databaseId: "665bf8170039f7082dea",
  userCollectionId: "665bf8d80010e84ca971",
  videoCollectionId: "665bf8fc00356e354bbb",
  storageId: "665bfae9001c9db5e668",
};
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
  .setProject(Config.projectId) // Your project ID
  .setPlatform(Config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getBrowser(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

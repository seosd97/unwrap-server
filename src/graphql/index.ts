import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const types = loadFilesSync(join(__dirname, "./**/*.graphql"));
export const typeDefs = mergeTypeDefs(types);

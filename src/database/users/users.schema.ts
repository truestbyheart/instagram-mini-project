import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  cookies: Array,
  dateOfEntry: Date,
  lastUpdated: Date,
});
export default mongoose.model('users', UserSchema);

declare module 'mongoose-encryption' {
    import { Schema } from 'mongoose';

    function encrypt(schema: Schema, options: any): void;

    export default encrypt;
}
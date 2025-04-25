import { Post } from '../../models/Post'
import { seeders } from '../seeders'
import path from 'path'

seeders(path.join(__dirname, './posts.json'), Post)

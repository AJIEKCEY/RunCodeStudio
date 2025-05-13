import { Comment } from '../../models/Comment'
import { seeders } from '../seeders'
import path from 'path'

seeders(path.join(__dirname, './commpents.json'), Comment)

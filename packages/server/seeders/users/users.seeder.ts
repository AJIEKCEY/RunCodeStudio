import { User } from '../../models/User'
import { seeders } from '../seeders'
import path from 'path'

seeders(path.join(__dirname, './users.json'), User)

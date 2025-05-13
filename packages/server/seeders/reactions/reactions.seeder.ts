import { Reaction } from '../../models/Reaction'
import { seeders } from '../seeders'
import path from 'path'

seeders(path.join(__dirname, './reactions.json'), Reaction)

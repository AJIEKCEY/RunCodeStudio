import { Category } from '../../models/Category'
import { seeders } from '../seeders'
import path from 'path'

seeders(path.join(__dirname, './categories.json'), Category)

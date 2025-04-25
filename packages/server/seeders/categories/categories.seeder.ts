import { Category } from '../../models/Categories'
import { seeders } from '../seeders'
import path from 'path'

seeders(path.join(__dirname, './categories.json'), Category)

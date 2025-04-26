import path from 'path'
import { seeders } from '../seeders'
import { Theme } from '../../models/Theme'

seeders(path.join(__dirname, './themes.json'), Theme)

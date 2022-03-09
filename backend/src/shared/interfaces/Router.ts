import { Router } from 'express'

export interface IRouter {
    init (db?: any): Router
}
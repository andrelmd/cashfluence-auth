import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string

  @Column({ name: 'password', type: 'varchar' })
  password: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column({ name: 'credit_score', type: 'int4', default: 0 })
  creditScore: number
}

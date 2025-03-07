import { IncrementDecrementOptionsWithBy } from 'sequelize';
import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey,AllowNull }    from 'sequelize-typescript'; 
import Budget from './Budget';


@Table({
    tableName: "expenses",
})

class Expense extends Model{
    @AllowNull
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @AllowNull
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number



    @ForeignKey(() => Budget)
    declare budgetId: number

    @BelongsTo(() => Budget)
    declare budget: Budget

}

export default Expense
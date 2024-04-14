import React, { FC } from 'react'
import { getIconByName } from '../../../../services/iconSelector'
import Icon, { IconButton } from '../../../../components/icon/Icon'
import './Record.css'

/* 和之前相同 */

interface RecordProps extends RecordItem {}

// 该类型用于声明账单条目是收入还是支出
export enum RecordType {
    Income = 'income', // 收入
    Expenditure = 'expenditure', // 支出
  }
  
  export interface RecordItem {
    id: number // 条目 id
    timeStamp: number // 条目对应的时间戳
    type: RecordType // 条目对应的收支类型
    name: string // 条目的名字，还用于 icon 查询
    price: number // 条目价格
    remark?: string // 条目备注信息，可选
  }

  const Record: FC<RecordProps> = ({ type, name, price, remark }) => {
    const icon = getIconByName(type, name) // 根据 icon 名字获取 icon 对应的 id
  
    return (
      <div className={'record'}>
        <Icon className={'record-icon'} icon={icon.icon} />
        <div className={'record-name'}>{name}</div>
        <div className={'record-remark'}>{remark}</div>
        <div className={'record-price'}>
          {/* 根据条目类型添加正负号，收入为 +，支出为 - */}
          {type === RecordType.Income ? '+' : '-'}
          {price}
        </div>
        {/* 每个条目的操作按钮组，暂时用 actions 作为 placeholder */}
        <div className={'record-action'}>
        <IconButton
          icon={'icon-bianji'}
          onClick={() => console.log('update')}
        />
        <IconButton
          icon={'icon-shanchu'}
          onClick={() => console.log('delete')}
        />
      </div>      </div>
    )
  }
  
  export default Record
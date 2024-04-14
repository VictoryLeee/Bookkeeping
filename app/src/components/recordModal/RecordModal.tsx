import { Form, Input, Modal, Tabs, message } from 'antd'
import { RecordItem, RecordType } from '../../pages/detail/components/record/Record'
import classNames from 'classnames'
import { Moment } from 'moment'
import LocaleDatePicker from '../localeDatePicker/LocaleDatePicker'
import { IconButton } from '../icon/Icon'
import { EXPENDITURE_ICON_LIST, INCOME_ICON_LIST } from '../../constants'
import { FC, useReducer } from 'react'
import './RecordModal.css'

const { Item, ErrorList } = Form
interface RecordModalProps {
  visible: boolean
  onClose: () => void
}

// 定义受控组件所有的 values 类型
interface Values extends Omit<RecordItem, 'id' | 'timeStamp'> {
  month: Moment
}

const RecordModal: FC<RecordModalProps> = ({ visible, onClose }) => {
  // 由于需要存储多个变量，所以使用 useReducer 更方便
  const [values, dispatch] = useReducer(
    (state: Values, updated: Partial<Values>) => ({ ...state, ...updated }),
    {} as Values,
  )

  function OnTypeChange(type?: RecordType, name?: string) {
    dispatch({ type, name })
  }

  function onMonthChange(month: Moment) {
    dispatch({ month })
  }

  function onPriceChange(price: number) {
    dispatch({ price })
  }

  function onRemarkChange(remark: string) {
    dispatch({ remark })
  }

  // 简单的验证函数
  function onSubmit() {
    if (!values.name) {
      message.error('请选择类型')
      return
    }

    if (!values.month) {
      message.error('请选择日期')
      return
    }

    if (!values.price) {
      message.error('请输入金额')
      return
    }

    message.success('创建成功')
  }

  return (
    <Modal
      okText={'确认'}
      cancelText={'取消'}
      destroyOnClose={true}
      visible={visible}
      onOk={onSubmit}
      onCancel={onClose}
    >
      <div className={'record-modal'}>
        <Tabs
          activeKey={values.type || RecordType.Expenditure}
          centered
          size={'middle'}
          onChange={(activeKey) => {
            OnTypeChange(activeKey as RecordType, undefined)
          }}
        >
          <Tabs.TabPane tab="支出" key={RecordType.Expenditure}>
            {EXPENDITURE_ICON_LIST.map((item) => (
              <div key={item.name} className={'record-item'}>
                <IconButton
                  icon={item.icon}
                  className={classNames({ active: values.name === item.name })}
                  onClick={() =>
                    OnTypeChange(RecordType.Expenditure, item.name)
                  }
                />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="收入" key={RecordType.Income}>
            {INCOME_ICON_LIST.map((item) => (
              <div key={item.name} className={'record-item'}>
                <IconButton
                  icon={item.icon}
                  className={classNames({ active: values.name === item.name })}
                  onClick={() => OnTypeChange(RecordType.Income, item.name)}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>

        <div className={'record-modal__list'}>
          <div className={'record-modal__list__item'}>
            <span>日期：</span>{' '}
            <LocaleDatePicker
              picker={'date'}
              value={values.month}
              onChange={onMonthChange}
            />
          </div>
          <div className={'record-modal__list__item'}>
            <span>金额：</span>{' '}
            <Input
              type={'number'}
              value={values.price}
              onChange={(e) => onPriceChange(parseInt(e.target.value))}
            />
          </div>
          <div className={'record-modal__list__item'}>
            <span>备注：</span>{' '}
            <Input
              maxLength={20}
              value={values.remark}
              onChange={(e) => onRemarkChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default RecordModal
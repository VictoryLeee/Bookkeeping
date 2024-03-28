import React, { FC } from 'react'
import Record, { RecordItem } from '../record/Record'
import './DailyRecords.css'
import { GroupedDailyRecords } from '../../../../services/recordHelper'
import { DateFormat, formatTimeStamp } from '../../../../services/dateHelper'

interface DailyRecordsProps extends GroupedDailyRecords {}
// DailyRecords 接受一组 records 信息，且这些 records 日期均在同一天，且是经过排序后的结果
const DailyRecords: FC<DailyRecordsProps> = ({
  records,
  summary,
  timeStamp,
}) => {
  return (
    <div className={'daily-records'}>
      <div className={'records'}>
      <div className={'daily-records-summary'}>
        <div className={'daily-records-date'}>
          {/* 调用 formatTimeStamp 格式化时间戳 */}
          {formatTimeStamp(timeStamp, DateFormat.MONTH_DAYOFWEEK)}
        </div>
        {summary.totalExpenditure > 0 && (
          <div className={'daily-records-detail'}>
            支出：-{summary.totalExpenditure}
          </div>
        )}
        {summary.totalIncome > 0 && (
          <div className={'daily-records-detail'}>
            收入：+{summary.totalIncome}
          </div>
        )}
      </div>
        {records.map((record) => (
          <Record key={record.timeStamp} {...record} />
        ))}
      </div>
    </div>
  )
}

export default DailyRecords
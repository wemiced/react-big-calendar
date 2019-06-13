import React from 'react'

import dates from 'date-arithmetic'
import events from '../events'
import BigCalendar from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import ExampleControlSlot from '../ExampleControlSlot'

const STEP_SIZE = 10
const TIMESLOTS_NUMBER = 6
//
// events.push({
//   id: 100,
//   title: 'Meeting - 2',
//   start: new Date(2015, 3, 12, 15, 0, 0, 0),
//   end: new Date(2015, 3, 12, 15, 10, 0, 0),
// })
//

events.push({
  id: 100,
  title: 'Meeting - 1 - 10',
  start: new Date(2015, 3, 12, 15, 0, 0, 0),
  end: new Date(2015, 3, 12, 15, 10, 0, 0),
})

events.push({
  id: 100,
  title: 'Meeting - 2 - 10',
  start: new Date(2015, 3, 12, 15, 10, 0, 0),
  end: new Date(2015, 3, 12, 15, 20, 0, 0),
})

events.push({
  id: 100,
  title: 'Meeting - 3 - 10',
  start: new Date(2015, 3, 12, 15, 20, 0, 0),
  end: new Date(2015, 3, 12, 15, 30, 0, 0),
})

class MyWeek extends React.Component {
  render() {
    let { date } = this.props
    let range = MyWeek.range(date)

    return <TimeGrid {...this.props} range={range} eventOffset={15} />
  }
}

MyWeek.range = date => {
  let start = date
  let end = dates.add(start, 2, 'day')

  let current = start
  let range = []

  while (dates.lte(current, end, 'day')) {
    range.push(current)
    current = dates.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -3, 'day')

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = date => {
  return `My awesome week: ${date.toLocaleDateString()}`
}

let CustomView = ({ localizer }) => (
  <React.Fragment>
    <ExampleControlSlot.Entry waitForOutlet>
      <strong>The Calendar below implments a custom 3-day week view</strong>
    </ExampleControlSlot.Entry>
    <BigCalendar
      events={events}
      localizer={localizer}
      defaultView={BigCalendar.Views.WEEK}
      defaultDate={new Date(2015, 3, 1)}
      step={STEP_SIZE}
      timeslots={TIMESLOTS_NUMBER}
      views={{ month: true, week: MyWeek }}
    />
  </React.Fragment>
)

export default CustomView

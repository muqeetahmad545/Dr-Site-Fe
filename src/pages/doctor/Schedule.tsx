import { Calendar, Badge, Card } from 'antd';
const getListData = (value: any) => {
  const date = value.date();
  switch (date) {
    case 10:
      return [{ type: 'success', content: 'Patient: John Doe @ 10AM' }];
    case 15:
      return [{ type: 'warning', content: 'Surgery: Jane Smith @ 2PM' }];
    case 25:
      return [{ type: 'error', content: 'Consultation: Bob Lee @ 1PM' }];
    default:
      return [];
  }
};

const dateCellRender = (value: any) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item, index) => (
        <li key={index}>
          <Badge status={item.type as any} text={item.content} />
        </li>
      ))}
    </ul>
  );
};

const Schedule = () => {
  return (
    <Card title="Schedule">
<Calendar dateCellRender={dateCellRender} />
    </Card>
  );
};

export default Schedule;

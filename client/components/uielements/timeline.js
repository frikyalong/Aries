import { Timeline } from 'antd';
import AntTimeline from './styles/timeline.style';

const Timelines = AntTimeline(Timeline);
const TimelineItem = AntTimeline(Timeline.Item);
export default Timelines;
export { TimelineItem };

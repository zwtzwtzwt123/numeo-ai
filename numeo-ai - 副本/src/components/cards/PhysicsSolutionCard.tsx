import { PhysicsSolutionResult } from '../../types';
import FormulaRenderer from '../FormulaRenderer';

interface Props { result: PhysicsSolutionResult; }

// 根据 category 判断所属模块，返回图标和标题
function getCardConfig(category: string): { icon: string; title: string } {
  const c = category || '';
  
  // 生活类
  if (/BMI|体脂|理想.*体重|体表面积|腰臀|腰高|基础代谢|BMR|TDEE|瘦体重|孕期|运动.*消耗|步数/i.test(c)) {
    return { icon: '⚖️', title: 'BMI & 身体健康' };
  }
  if (/食物|卡路里|营养|跑步|走路|骑车|游泳|跳绳|减重|减肥|增重|饮水|补水|酒精|蛋白质|碳水|脂肪|膳食|糖尿病|生酮|禁食|食谱|MET|EPOC/i.test(c)) {
    return { icon: '🍎', title: '热量与营养' };
  }
  if (/盎司|磅|克|杯|勺|汤匙|茶匙|烤箱|油温|面团|蛋糕|米饭|水米|调料|意面|食谱.*缩放|烤盘|聚餐|宴会|烤肉|蒸制|煮蛋|油炸|压力锅|酵母|发酵|烘焙|盐度|糖度|面粉.*替换|糖类.*替换|乳制品|低钠|无麸质|咖啡|泡茶|鸡尾酒|糖浆|冰箱.*保存/i.test(c)) {
    return { icon: '🍳', title: '烹饪换算' };
  }
  
  // 机械类
  if (/齿轮|模数|分度圆|齿顶|齿根|齿宽|传动比|蜗杆|行星.*轮|谐波.*齿轮|重合度|变位|齿侧|齿面|胶合|修形|噪声.*齿轮|热平衡.*齿轮/i.test(c)) {
    return { icon: '⚙️', title: '齿轮传动' };
  }
  if (/轴承|当量.*动载荷|额定.*寿命|静载荷|极限.*转速|轴肩/i.test(c)) {
    return { icon: '🔩', title: '轴承计算' };
  }
  if (/弹簧|花键|过盈|导轨|丝杠|棘轮|槽轮|液压缸|气动|联轴器|飞轮|带轮|带速|链节|链轮|凸轮|摩擦|磨损|润滑|油膜|机械效率/i.test(c)) {
    return { icon: '🪝', title: '弹簧与机械设计' };
  }
  if (/螺栓|焊缝|公差|配合|轴径|键槽|临界.*转速|屈服.*安全|疲劳.*安全|应力.*集中|许用.*应力|淬透性|回火|封闭环|位置度|跳动|夹紧力|定位.*误差|切削|进给|表面.*粗糙度|三坐标|角度.*测量/i.test(c)) {
    return { icon: '⚙️', title: '机械工程' };
  }
  
  // 工程类
  if (/结构力学|简支梁|悬臂梁|弯矩|剪力|挠度|截面|欧拉|临界力|桁架|连续梁|弯扭|压弯|拉弯|温度应力|冲击荷载|影响线|弯曲刚度|轴向刚度/i.test(c)) {
    return { icon: '🏗️', title: '结构力学' };
  }
  if (/土方|棱柱体|平均断面|方格网|边坡|基槽|基坑|回填|混凝土|水灰比|配合比|水泥用量|砂率|钢筋|配筋率|锚固|搭接|箍筋|加密区|下料|地基.*承载|Terzaghi|太沙基|基底压力|地基.*沉降|单桩|桩数|基础.*高度|冲切/i.test(c)) {
    return { icon: '🚧', title: '土木工程' };
  }
  if (/楼面.*活荷载|屋面.*活荷载|雪荷载|风荷载|荷载.*组合|建筑.*高度|建筑.*面积|容积率|建筑.*密度|绿地率|日照|窗地|采光系数|体形系数|窗墙比|传热系数|热惰性|遮阳系数|隔声量|混响|噪声.*衰减|轮椅|无障碍|楼梯|栏杆|雨水斗|装修|踢脚线|柱网|层高|伸缩缝|绿化|种植土|停车|造价|使用.*寿命|防火.*分区|疏散.*距离|外墙.*传热|屋面.*传热|保温.*厚度|热桥|冷凝|门窗.*K值|SHGC|气密性|全年.*能耗|采暖.*度日|空调.*度日/i.test(c)) {
    return { icon: '🏛️', title: '建筑工程' };
  }
  if (/功率因数|无功补偿|变压器.*容量|变压器.*效率|电压降|短路.*电流|载流量|电缆|AWG|母线|过电流|速断|差动|接地.*电阻|跨步电压|接触电压|接闪器|电机|变频|照度|灯具|光伏|储能|漏电|绝缘.*电阻|断路器|熔断器|接触器|热继电器|THD|谐波|闪变|发电机|整流|逆变器|斩波|线损|需要系数|利用系数|同期系数|脱扣器|应急.*照明|消防.*泵|信号.*衰减|SPD|浪涌/i.test(c)) {
    return { icon: '🔌', title: '电气工程' };
  }
  if (/冷负荷|热负荷|围护|新风|显热|潜热|送风量|排风量|风管|风机|冷冻水|冷却水|水管|水泵.*扬程|膨胀.*水箱|cop|制冷|冷吨|冷却塔|锅炉.*效率|热泵|风机盘管|风口|换气次数|保温.*经济|排烟|防烟|并联.*环路|调节阀|平衡阀|全面.*通风|事故.*通风|卫生间.*排风|相对湿度|含湿量|露点|湿球|冷量.*计量|热量.*计量|热伸长|管道.*热损|补偿器|洁净|过滤器.*效率|比转数|汽蚀|冷库|地暖|制冷循环|制冷剂|排气.*温度|逼近度|飘水|容尘量|消声器|隔振器|除湿|加湿|风幕/i.test(c)) {
    return { icon: '🔥', title: '暖通工程' };
  }
  if (/设计.*秒.*流量|给水|排水|化粪池|隔油池|暴雨.*强度|雨水.*流量|天沟|径流系数|LID|海绵|耗热量.*热水|贮水.*容积|膨胀罐|太阳能.*集热|中水|BOD|沉淀池|游泳池|喷泉.*水泵|绿化.*灌溉|钢管.*壁厚|环刚度|软化.*水量|反渗透|消毒剂|水锤|管网.*平差|最小.*流速|管道.*埋深|截流倍数|浓缩倍数|排污量|抗震.*支架/i.test(c)) {
    return { icon: '🚰', title: '给排水' };
  }
  if (/消火栓|水带|水枪|充实.*水柱|喷头|喷淋|报警阀|七氟丙烷|fm200|ig541|co2|气溶胶|泄压口|储存瓶|消防.*水池|消防.*水箱|泡沫.*混合|泡沫.*储量|干粉|消防.*应急|疏散.*指示|消防.*电梯|探测器|加压.*送风|自然.*排烟|灭火器|消防.*管道|消防.*水泵|减压.*孔板|细水雾|消防炮|水幕|转输.*水箱|稳压泵|防火.*卷帘|防火阀|防火.*封堵|疏散.*宽度|疏散.*时间|疏散.*出口|安全.*出口|消防.*泵房|吸水.*喇叭口|联动.*控制|泄爆|防爆墙|消防.*电话|消防.*车道|登高|防火.*间距|隧道.*消火栓|隧道.*排烟|同一.*时间.*火灾/i.test(c)) {
    return { icon: '🧯', title: '消防工程' };
  }
  
  // 物理类
  if (/力学|动能|势能|动量|自由落体|抛体|万有引力|摩擦力|弹力|浮力|圆周|单摆|斜面|压强|密度|碰撞|机械能|伯努利|雷诺|泊肃叶|角速度|转动惯量|扭矩|角动量/i.test(c)) {
    return { icon: '⚡', title: '力学计算' };
  }
  if (/热量|潜热|热传导|热膨胀|理想气体|卡诺|熵|黑体|绝热|分子动能/i.test(c)) {
    return { icon: '🔥', title: '热力学' };
  }
  if (/欧姆|电功率|电阻|电容|电感|库仑|电场|电势|洛伦兹|安培|磁场|磁通量|电磁感应|法拉第|动生电动势|自感|变压器|阻抗|感抗|容抗|谐振|RMS|电磁波|麦克斯/i.test(c)) {
    return { icon: '🧲', title: '电磁学' };
  }
  
  // 默认
  return { icon: '⚡', title: '物理计算' };
}

export default function PhysicsSolutionCard({ result }: Props) {
  const config = getCardConfig(result.category || '');

  return (
    <div className="card-result">
      <div className="card-title">{config.icon} {config.title}</div>
      <div className="bg-dark-900 rounded-lg p-3 mb-3 text-center">
        <FormulaRenderer formula={result.formula} displayMode={true} />
      </div>
      {result.steps && result.steps.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {result.steps.map((step, i) => (
            <div key={i} className="text-sm text-dark-300 font-mono pl-2 border-l-2 border-dark-600">
              {step}
            </div>
          ))}
        </div>
      )}
      <div className="border-t border-dark-600 pt-3">
        <span className="text-lg font-bold font-mono text-accent-green">
          {result.result != null ? result.result.toLocaleString() : 'N/A'} {result.unit || ''}
        </span>
      </div>
      {result.extra && Object.keys(result.extra).length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-dark-400">
          {Object.entries(result.extra).map(([key, value]) => (
            <div key={key} className="bg-dark-700 rounded px-2 py-1 flex justify-between">
              <span className="text-dark-500">{formatExtraKey(key)}</span>
              <span className="text-white font-mono">{typeof value === 'number' ? Number(value).toLocaleString() : value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatExtraKey(key: string): string {
  const map: Record<string, string> = {
    acceleration: '加速度', period: '周期', frequency: '频率',
    total_energy: '总能量', final_velocity: '末速度', displacement: '位移',
    max_height: '最高点', flight_time: '飞行时间', energy_loss: '能量损失',
    v2_after: '碰后v₂', normal: '正压力', force: '受力',
    optimal_risk: '最优风险', w1: '资产A权重', w2: '资产B权重',
  };
  return map[key] || key.replace(/_/g, ' ');
}
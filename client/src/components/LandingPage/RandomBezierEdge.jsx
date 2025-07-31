import { getBezierPath } from 'reactflow';

const RandomBezierEdge = ({ id, sourceX, sourceY, targetX, targetY, style = {}, markerEnd }) => {
  const offsetX = (Math.random() - 0.5) * 200;
  const offsetY = (Math.random() - 0.5) * 200;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition: 'right',
    targetX,
    targetY,
    targetPosition: 'left',
    curvature: 0.5,
    centerX: (sourceX + targetX) / 2 + offsetX,
    centerY: (sourceY + targetY) / 2 + offsetY
  });

  return (
    <path
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

export default RandomBezierEdge;
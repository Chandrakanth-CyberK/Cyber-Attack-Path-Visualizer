import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { NetworkNode, NetworkEdge } from '../types';

interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  width?: number;
  height?: number;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  nodes, 
  edges, 
  width = 800, 
  height = 600 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodeColor = (status: NetworkNode['status']) => {
    switch (status) {
      case 'safe': return '#10B981';      // green-500
      case 'under-attack': return '#F59E0B'; // amber-500  
      case 'compromised': return '#EF4444';  // red-500
      default: return '#6B7280'; // gray-500
    }
  };

  const getNodeIcon = (type: NetworkNode['type']) => {
    switch (type) {
      case 'workstation': return '🖥️';
      case 'server': return '🖲️';
      case 'database': return '🗄️';
      case 'firewall': return '🛡️';
      case 'router': return '🌐';
      default: return '📱';
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create simulation
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(edges).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create container for zoom
    const container = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create edges
    const link = container
      .selectAll('.link')
      .data(edges)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', (d: NetworkEdge) => d.compromised ? '#EF4444' : '#374151')
      .attr('stroke-width', (d: NetworkEdge) => d.compromised ? 3 : 2)
      .attr('stroke-opacity', 0.8)
      .style('stroke-dasharray', (d: NetworkEdge) => d.compromised ? '5,5' : 'none');

    // Create node groups
    const nodeGroup = container
      .selectAll('.node-group')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .style('cursor', 'pointer');

    // Add circles for nodes
    nodeGroup
      .append('circle')
      .attr('r', 25)
      .attr('fill', (d: NetworkNode) => getNodeColor(d.status))
      .attr('stroke', '#1F2937')
      .attr('stroke-width', 2)
      .style('filter', (d: NetworkNode) => 
        d.status === 'compromised' ? 'drop-shadow(0 0 10px #EF4444)' : 
        d.status === 'under-attack' ? 'drop-shadow(0 0 8px #F59E0B)' : 
        'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
      );

    // Add pulsing animation for compromised nodes
    nodeGroup
      .selectAll('circle')
      .filter((d: NetworkNode) => d.status === 'compromised')
      .style('animation', 'pulse 2s infinite');

    // Add node icons
    nodeGroup
      .append('text')
      .text((d: NetworkNode) => getNodeIcon(d.type))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .style('font-size', '16px')
      .style('pointer-events', 'none');

    // Add node labels
    nodeGroup
      .append('text')
      .text((d: NetworkNode) => d.name)
      .attr('x', 0)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('fill', '#F9FAFB')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('pointer-events', 'none');

    // Add drag behavior
    const drag = d3.drag<SVGGElement, NetworkNode>()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeGroup.call(drag);

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeGroup
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, edges, width, height]);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-600 rounded"
      />
    </div>
  );
};

export default NetworkGraph;
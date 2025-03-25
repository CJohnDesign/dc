'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface BarData {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  data: BarData[];
  height: number;
  width?: number;
  title?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  animationDuration?: number;
  showValues?: boolean;
  valueFormat?: (value: number) => string;
  className?: string;
}

const BarChart = ({
  data,
  height,
  width = 300,
  title,
  margin = { top: 40, right: 30, bottom: 50, left: 40 },
  animationDuration = 1000,
  showValues = true,
  valueFormat = (value) => `${value}%`,
  className = '',
}: BarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(width);

  // Responsive width adjustment
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        setChartWidth(Math.min(width, containerWidth));
      }
    };

    // Initial size
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [width]);

  // Draw chart
  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    
    // Calculate dimensions
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.5); // Increased padding for more Felton-like spacing

    const yScale = d3.scaleLinear()
      .domain([0, 100]) // Fixed domain for consistency
      .range([innerHeight, 0]);

    // Create container group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add title if provided
    if (title) {
      svg.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('class', 'chart-title')
        .text(title);
    }

    // Add subtle grid lines
    g.selectAll('line.grid')
      .data(yScale.ticks(4)) // Fewer grid lines for cleaner look
      .enter()
      .append('line')
      .attr('class', 'grid')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .attr('stroke', '#e5e5e5')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2,2');

    // Add x-axis with minimal styling
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(xScale)
          .tickSize(0) // Remove tick marks
      )
      .call(g => g.select('.domain').remove()) // Remove axis line
      .selectAll('text')
      .attr('class', 'chart-label')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('y', 10)
      .text((d: any) => d.split('\n')[0])
      .append('tspan')
      .attr('x', 0)
      .attr('dy', '1.2em')
      .text((d: any) => d.split('\n')[1] || '');

    // Add y-axis with minimal styling
    g.append('g')
      .call(
        d3.axisLeft(yScale)
          .ticks(4) // Fewer ticks for cleaner look
          .tickSize(0) // Remove tick marks
          .tickFormat(d => `${d}%`) // Add % to y-axis labels
      )
      .call(g => g.select('.domain').remove()) // Remove axis line
      .selectAll('text')
      .attr('class', 'chart-label')
      .attr('dx', '-0.5em');

    // Add bars with subtle gradient
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: BarData) => xScale(d.label) || 0)
      .attr('width', xScale.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('fill', (d: BarData) => {
        // Create gradient for each bar
        const gradientId = `gradient-${d.label.replace(/\s+/g, '-').toLowerCase()}`;
        
        const gradient = svg.append('defs')
          .append('linearGradient')
          .attr('id', gradientId)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '0%')
          .attr('y2', '100%');
          
        // Safely handle color brightening
        const brighterColor = d3.color(d.color);
        const startColor = brighterColor ? brighterColor.brighter(0.5).toString() : d.color;
          
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', startColor);
          
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', d.color);
          
        return `url(#${gradientId})`;
      })
      .attr('rx', 2) // Subtle rounded corners
      .attr('stroke', (d: BarData) => {
        const darkerColor = d3.color(d.color);
        return darkerColor ? darkerColor.darker(0.2).toString() : d.color;
      })
      .attr('stroke-width', 0.5)
      .transition()
      .duration(animationDuration)
      .attr('y', (d: BarData) => yScale(d.value))
      .attr('height', (d: BarData) => innerHeight - yScale(d.value));

    // Add values on top of bars
    if (showValues) {
      g.selectAll('.bar-value')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'chart-value')
        .attr('x', (d: BarData) => (xScale(d.label) || 0) + xScale.bandwidth() / 2)
        .attr('y', (d: BarData) => yScale(d.value) - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', (d: BarData) => {
          const darkerColor = d3.color(d.color);
          return darkerColor ? darkerColor.darker(0.2).toString() : d.color;
        })
        .attr('opacity', 0)
        .text((d: BarData) => valueFormat(d.value))
        .transition()
        .delay(animationDuration / 2)
        .duration(animationDuration / 2)
        .attr('opacity', 1);
    }
  }, [data, height, chartWidth, margin, animationDuration, showValues, valueFormat, title]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg 
        ref={svgRef} 
        width={chartWidth} 
        height={height} 
        className="overflow-visible"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default BarChart; 
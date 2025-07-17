import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import * as d3 from 'd3';
import { ExpenseService } from '../shared/expenses';
import { Expense } from '../shared/expense.model';

@Component({
  selector: 'app-pie-chart',
  imports: [RouterLink, MatIcon],
  templateUrl: './pie-chart.html',
  styleUrls: ['./pie-chart.scss']
})
export class PieChart implements AfterViewInit, OnInit {
  @ViewChild('pieChart', { static: false }) private chartContainer!: ElementRef;

  expenses: Expense[] = [];

  // Define the categories we want to track
  categories = ['Food', 'Housing', 'Commute', 'Health', 'Entertainment'];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    // Fetch the expenses from the service
    this.expenses = this.expenseService.getExpenses();
  }

  ngAfterViewInit() {
    this.createPieChart();
  }

  // Calculate the total expenses by category
  getTotalExpensesByCategory(): { category: string, total: number }[] {
    const totals: { [key: string]: number } = {};

    // Initialize the category totals to 0
    this.categories.forEach(category => {
      totals[category] = 0;
    });

    // Sum expenses for each category
    this.expenses.forEach(expense => {
      if (this.categories.includes(expense.category)) {
        totals[expense.category] += expense.amount;
      }
    });

    // Return the totals as an array of objects
    return this.categories.map(category => ({
      category,
      total: totals[category]
    }));
  }

  createPieChart(): void {
    if (!this.chartContainer) {
      console.error('chartContainer is not available!');
      return;
    }

    // Get the total expenses per category
    const expenseTotals = this.getTotalExpensesByCategory();

    // Filter out categories with a total of 0 (optional)
    const filteredData = expenseTotals.filter(d => d.total > 0);

    // Extract data and labels
    const data = filteredData.map(d => d.total);
    const labels = filteredData.map(d => d.category);

    const width = 800;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie();

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pieChartData = pie(data);

    const arcs = svg
      .selectAll('.arc')
      .data(pieChartData)
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc as any)
      .style('fill', (d, i) => color(i.toString()));

    // Add the Legend
    const legendSpacing = 20; // Spacing between each legend item

    const legend = svg
      .append('g')
      .attr('transform', `translate(170,100)`); // Position it below the pie chart

    const legendItems = legend
      .selectAll('.legend-item')
      .data(labels)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * legendSpacing})`); // Position each legend item vertically

    // Draw colored squares for the legend
    legendItems
      .append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .style('fill', (d, i) => color(i.toString())); // Match color to pie slice

    // Add text next to the colored squares
    legendItems
      .append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('font-size', '12px')
      .text((d) => d); // Use the labels array for text
  }
}

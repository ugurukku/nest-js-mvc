// Admin Dashboard JavaScript

// Sidebar toggle for mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Modal functions
function showModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });

  // Handle navigation item clicks
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all items
      document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
      });
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Update page title
      const pageName = this.textContent.trim();
      document.querySelector('.header-title').textContent = pageName;
    });
  });
});

// Initialize charts
function initializeCharts(data) {
  // Project Status Chart
  const projectChartCtx = document.getElementById('projectChart').getContext('2d');
  new Chart(projectChartCtx, {
    type: 'doughnut',
    data: {
      labels: data.projectStatus.labels,
      datasets: [{
        data: data.projectStatus.data,
        backgroundColor: ['#10b981', '#2563eb', '#f59e0b'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  // Revenue Chart
  const revenueChartCtx = document.getElementById('revenueChart').getContext('2d');
  new Chart(revenueChartCtx, {
    type: 'line',
    data: {
      labels: data.revenue.labels,
      datasets: [{
        label: 'Revenue ($k)',
        data: data.revenue.data,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value + 'k';
            }
          }
        }
      }
    }
  });
}

// Project functions
function editProject(projectId) {
  // In a real app, you would fetch project data and populate the form
  console.log('Edit project:', projectId);
  showModal('projectModal');
}

function viewProject(projectId) {
  // Navigate to project details page
  window.location.href = `/admin/projects/${projectId}`;
}

// Contact functions
function replyContact(contactId) {
  // In a real app, this would open a reply modal or navigate to reply page
  console.log('Reply to contact:', contactId);
}

function archiveContact(contactId) {
  if (confirm('Are you sure you want to archive this contact?')) {
    // In a real app, this would make an API call to archive the contact
    fetch(`/admin/contacts/${contactId}/archive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showToast('Contact archived successfully', 'success');
        // Reload the page or update the UI
        setTimeout(() => location.reload(), 1000);
      }
    })
    .catch(error => {
      showToast('Error archiving contact', 'error');
    });
  }
}

// Export contacts to CSV
function exportContacts() {
  window.location.href = '/admin/contacts/export';
}

// Generate report
function generateReport() {
  // In a real app, this would open a report generation modal
  console.log('Generate report');
  showToast('Report generation started', 'success');
}

// Toast notification
function showToast(message, type = 'success') {
  // Create toast element if it doesn't exist
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  // Update toast
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.display = 'block';

  // Hide after 3 seconds
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const projectForm = document.querySelector('#projectModal form');
  if (projectForm) {
    projectForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Convert technologies string to array
      data.technologies = data.technologies.split(',').map(t => t.trim());
      
      // Submit form via AJAX
      fetch('/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          showToast('Project created successfully', 'success');
          closeModal('projectModal');
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('Error creating project', 'error');
        }
      })
      .catch(error => {
        showToast('Error creating project', 'error');
      });
    });
  }
});

// Search functionality
function searchProjects(query) {
  const rows = document.querySelectorAll('tbody tr');
  const lowerQuery = query.toLowerCase();
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(lowerQuery) ? '' : 'none';
  });
}

// Filter functionality
function filterByStatus(status) {
  const rows = document.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    if (status === 'all') {
      row.style.display = '';
    } else {
      const statusBadge = row.querySelector('.status-badge');
      const rowStatus = statusBadge ? statusBadge.classList[1].replace('status-', '') : '';
      row.style.display = rowStatus === status ? '' : 'none';
    }
  });
}

// Auto-save functionality for forms
function enableAutoSave(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      localStorage.setItem(`${formId}_${input.name}`, input.value);
      showToast('Draft saved', 'success');
    });
  });
  
  // Restore saved values
  inputs.forEach(input => {
    const savedValue = localStorage.getItem(`${formId}_${input.name}`);
    if (savedValue) {
      input.value = savedValue;
    }
  });
}

// Clear auto-saved form data
function clearAutoSave(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    localStorage.removeItem(`${formId}_${input.name}`);
  });
}
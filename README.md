<div align="center">
  <img src="public/assets/images/logo.png" alt="Propify Logo" />
</div>

<h1 align="center" style="color:#5659f9; margin-top: 0;">Propify</h1>
<p align="center" style="color:#4f46e5; margin-top: 0;">A modern property booking + management platform — React + TypeScript + Vite</p>

---


**ProPify** is a full-featured property booking platform consisting of two main parts:  
1. **Customer-facing platform**  
2. **Admin & Employee Dashboard**

---

## Overview

ProPify is designed as a complete system for managing properties and bookings efficiently.  
The platform supports both **Arabic and English languages** and provides a **clean and user-friendly interface**, including **charts and analytics** in the dashboard for quick insights.

---

## Workflow

### 1️⃣ Customer Experience

1. The customer browses available properties.  
2. Selects a property and submits a **booking request** for specific dates.  
3. Communicates with employees via the **internal messaging system**.  
4. Tracks the booking status: **Pending → Approved / Rejected / Rescheduled**.  
5. Reviews previous bookings and manages favorites.

### 2️⃣ Employee Experience

1. Receives new booking requests.  
2. Reviews requests and takes action:
   - **Approve** → sends confirmation to the customer  
   - **Reject** → optionally with a reason  
   - **Reschedule** → updates booking dates  
3. Communicates with the customer via the internal messaging system if needed.

### 3️⃣ Admin Experience

1. Full property management with the ability to add extra features.  
2. User management for Customers and Employees.  
3. Monitoring bookings and generating property reports.  
4. Viewing system analytics using **charts**.  
5. Tracking notifications and overseeing overall system activity.

---

## Key Features

- Full property listing with images and detailed information  
- Advanced filtering and search  
- Pagination for optimized performance  
- **Property Availability System** to prevent booking conflicts  
- **Notification system** for tracking system events  
- Simple **messaging system** between customers and employees  
- Multilingual support (**Arabic / English**)  
- Dashboard with **charts and statistics** for system monitoring

---

## Tech Stack

**Frontend:**  
- React  
- TypeScript  
- Tailwind CSS  
- React Query  
- i18n

**Backend / Dashboard:**  
- Laravel  
- PHP  
- MySQL  
- Spatie Permissions

---

## Learning Goals

This project allowed me to implement advanced concepts such as:  
- **Clean Architecture**  
- **SOLID principles**  
- Real **business logic** workflows, not just CRUD operations

---

## Notes

This platform can be extended into a **SaaS system** by adding **multi-tenant support**, allowing multiple companies to use the same system independently.

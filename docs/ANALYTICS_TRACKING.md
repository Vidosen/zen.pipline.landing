# Analytics Tracking Implementation

## Overview
Implemented analytics tracking for both Yandex Metrica and MyTracker to monitor user interactions with the contact form on the landing page.

## Tracking Events

### 1. Form Scroll (`form_scroll`)
**Triggers when:** User scrolls to the contact form section (30% visible)
- **Yandex Metrica:** `ym(103555381, 'reachGoal', 'form_scroll')`
- **MyTracker:** Goal `form_scroll` with value `1`

### 2. Form Start (`form_start`)
**Triggers when:** User first interacts with any form field (focus/input)
- **Yandex Metrica:** `ym(103555381, 'reachGoal', 'form_start')`
- **MyTracker:** Goal `form_start` with value `1`

### 3. Lead Submit (`lead_submit`)
**Triggers when:** User successfully submits the contact form
- **Yandex Metrica:** `ym(103555381, 'reachGoal', 'lead_submit')`
- **MyTracker:** Goal `lead_submit` with value `10`

## Implementation Details

### Analytics Functions
Global tracking functions are defined in `public/index.html`:
- `window.trackFormScroll()`
- `window.trackFormStart()`
- `window.trackFormSubmit()`

### Form Component Integration
The `Contact.js` component includes:
- **Intersection Observer** for scroll tracking
- **Focus handlers** on all input fields for form start tracking
- **Success callback** in form submission for lead tracking
- **State management** to prevent duplicate events

### Event Values
- `form_scroll`: Value 1 (low value interaction)
- `form_start`: Value 1 (medium value interaction)
- `lead_submit`: Value 10 (high value conversion)

## Analytics Counter IDs
- **Yandex Metrica:** `103555381`
- **MyTracker:** `3659683`

## Testing
Events include console logging for debugging:
- "Analytics: Scrolled to form section"
- "Analytics: Form interaction started"  
- "Analytics: Lead form submitted"

## Conversion Funnel
1. **Page View** → 2. **Form Scroll** → 3. **Form Start** → 4. **Lead Submit**

This allows tracking of the complete user journey from landing page visit to lead conversion.
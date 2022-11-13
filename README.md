# Welcome to NeckTie Doctor Booking

- [Welcome to NeckTie Doctor Booking](#welcome-to-necktie-doctor-booking)
  - [Choice of Package](#choice-of-package)
    - [React Framework](#react-framework)
    - [UI Library](#ui-library)
  - [Potential Improvement](#potential-improvement)
    - [filter, search, and login](#filter-search-and-login)
    - [use well-developed packages instead](#use-well-developed-packages-instead)
  - [Production consideration](#production-consideration)
    - [performance, security and aesthetic](#performance-security-and-aesthetic)
  - [Assumptions](#assumptions)

## Choice of Package

### React Framework

    - NextJS

NextJS is a opinionated React framework fully support typescript and server-side-render hence having a better SEO, and since it is framework the folder structure NextJS should be able to scale with as the code base and team grows.

It also includes routing, api route, and deploy which reduce the development time especially for rapid development.

However, the downside of NextJS would be large bundle size, and the worry of over-dependant on Vercel eco-system, any drastic update might have a big impact to the code base both good and bad.

### UI Library

    - MUI
    - MUI-x
      - x-date-picker
Material-UI is a sleek, mature and stable UI library, it is great for rapid development so developers can focus on the logic, and the UI would be more standardized.

However, if ones without a good understand of CSS might struggle to understand how to use 'sx', etc., the other concern will be CSS-in-JS will have a larger bundle size, on top MUI's own hence might lead to slow load time.

Although MUI is heavy but the benefit of standardization, flexibility outweigh the cons. Apart from MUI core, I have also used the MUI-x date picker package which works seamless with MUI-core and also feature the validation and disable logic has speed the development process.

## Potential Improvement

### filter, search, and login

If given more time, I would like to add filter, search and login functions to the application.
Looking from the perspective of a patient, if one can filter by district, or search by name or id, it will greatly benefit the user experience. Also by including a login system means users are able to check their bookings, or  histories; As for the company, we can have a better understanding of the users from there we can share products or promotions which are suitable for them.

### use well-developed packages instead

I would like to update my package of choice by including some well-known form validation packages such as formik or react-hook-forms, also testings packages such as Jest or Cypress, for these area I would need more time to learn the packages and how to implement them.

## Production consideration

### implement the other endpoints
I understand this assessment's scope is within 8 hours, and I love to implement the rest of the endpoints.

### tests
I believe we could use Jest to do unit tests for endpoints if as expected, and elements being rendered as expected, however, I am not too quite familiar yet.

### performance, security and aesthetic

The application should be tested including edge cases and approved by senior engineers and designers for performance, security, and aesthetic concerns before deployment to the production environment might also need to consider enough color contrast or a11y for accessability concerns.

## Assumptions

a: There weren't any assumptions because no design were made, however, I have setup the interfaces according to the API schema shown on Swagger UI.

b: I assumed the time would be in timestamp, and for the first time I need to convert between float and time, and no much assumption were made prior to the assessment.

Since this assignment is recommended to be finished within 8 hours, I assumed to build the barebone version and get some feedback before implementing other features and touch up on CSS. I also wasn't expected to handle time with Javascript, and it was good challenge let me learn about handling time.

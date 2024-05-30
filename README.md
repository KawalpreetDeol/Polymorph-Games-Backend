# Polymorph Games Backend

## Overview

Polymorph Games offers a diverse collection of interactive Android games, with the backend infrastructure playing a pivotal role in user management, game data storage, and serverless function execution for a seamless gaming experience.

Android application code (Java+Kotlin) available upon request.

## Purpose

The purpose of the backend is to provide essential services such as secure user authentication, real-time data storage for profiles, game scores, and ratings, ensuring a robust and scalable infrastructure to support the Polymorph Games ecosystem.

## Technologies Used

- **Node.js**: Used for scripting serverless functions in Firebase Cloud Functions, facilitating backend logic like user data handling and game score processing.
- **Firebase Authentication**: Manages user registration, login, and secure access to game scores, profiles, and ratings.
- **Firebase Firestore**: A scalable NoSQL database for storing user profiles, game scores, and ratings, allowing for efficient data retrieval and updates.
- **Firebase Cloud Functions**: Provides a serverless execution environment for running backend code in response to Firebase events and HTTPS requests.

## Serverless API Callable Functions

### User Management

- **User Signup**: Initiates upon user registration to create user profile documents in Firestore and set up initial scores and ratings entries.

### Game Score and Ratings Management

- **Update Score**: Allows for updating individual game scores for users, reflecting in real-time on leaderboards and user profiles.
- **Get Scores**: Retrieves scores across all games for a user, showcasing their achievements and game progress.
- **Update User Ratings**: Enables users to rate games, updating their ratings in the `user_ratings` collection.
- **Get Ratings**: Fetches average ratings for each game from the `ratings` collection, providing insights into game popularity and user satisfaction.

## Database Design

### Collections

- **Users**: Holds user profiles with details such as email, names, and settings preferences.
- **Game Scores Collections** (`alienDefence_scores`, `allOutDefence_scores`, `catastrophe_scores`, `picturePerfect_scores`): Dedicated to tracking user scores for each game, facilitating game-specific data organization.
- **Ratings**: Stores the average rating for each game, with each document representing a game and containing a `rating` field.
- **User_Ratings**: Contains documents for each user, with fields for each game representing the user's rating, allowing for personalized feedback on each game.

### Relationships

- Direct linkage between **Users** and individual game score collections as well as the `user_ratings` collection, ensuring a cohesive data structure that supports multifaceted user data management.
- The `ratings` collection aggregates user feedback to present an overarching view of game reception, complemented by detailed user-specific ratings stored in `user_ratings`.

## Security and Scalability

- Firebase Authentication and security rules safeguard user data, while Firestore and Cloud Functions' scalable nature accommodates growing user engagement without compromising performance.

This comprehensive backend documentation underscores the essential role of Firebase services in supporting Polymorph Games, detailing the architecture designed to manage user interactions, game scores, and ratings efficiently and securely.

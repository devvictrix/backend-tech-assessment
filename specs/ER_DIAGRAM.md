erDiagram
    direction TB

    users {
        string id PK "Primary Key (CUID)"
        string key UK "Unique business key"
        string email UK "Unique email"
        string password "Hashed password"
        datetime created_at "Creation timestamp"
        datetime updated_at "Update timestamp"
    }

    roles {
        int id PK "Primary Key (Serial)"
        string key UK "e.g., 'interviewer'"
        string name "e.g., 'Interviewer'"
        datetime created_at "Creation timestamp"
        datetime updated_at "Update timestamp"
    }

    interviews {
        string id PK "Primary Key (CUID)"
        string title "Interview title"
        string description "Nullable description"
        string status "Enum: 'TODO', 'IN_PROGRESS', 'DONE'"
        boolean is_saved "Default: false"
        string user_id FK "FK to users.id"
        datetime created_at "Creation timestamp"
        datetime updated_at "Update timestamp"
    }

    interview_comments {
        string id PK "Primary Key (CUID)"
        text content "Comment text"
        string user_id FK "FK to users.id"
        string interview_id FK "FK to interviews.id"
        datetime created_at "Creation timestamp"
        datetime updated_at "Update timestamp"
    }

    interview_history {
        string id PK "Primary Key (CUID)"
        string action "e.g., 'CREATED', 'UPDATED_STATUS'"
        text old_value "Value before change (nullable)"
        text new_value "Value after change (nullable)"
        string user_id FK "User who made the change"
        string interview_id FK "FK to interviews.id"
        datetime changed_at "Timestamp of the change"
    }

    users ||--o{ interviews : "owns"
    users ||--o{ interview_comments : "writes"
    users ||--o{ interview_history : "performs changes"
    users }o--o{ roles : "has"

    interviews ||--o{ interview_comments : "has"
    interviews ||--o{ interview_history : "has history of"
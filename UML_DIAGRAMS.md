# Fanscore UML Diagrams

Bu dokuman Fanscore projesi icin istenen use case ve sequence diagramlarini icerir.

## Diyagramlari Gorsellestirme Notlari

- **Use Case Diagram** PlantUML formatindadir. Gorsellestirmek icin:
  - VS Code icinde **PlantUML** eklentisi kurulabilir.
  - Alternatif olarak kod blogu https://www.plantuml.com/plantuml/uml/ adresinde render edilebilir.
  - PlantUML kodu `@startuml` ile baslar, `@enduml` ile biter.

- **Sequence Diagram** bolumleri Mermaid formatindadir. Gorsellestirmek icin:
  - GitHub uzerinde `.md` dosyasi acildiginda Mermaid diyagramlari otomatik render edilir.
  - VS Code icinde **Markdown Preview Mermaid Support** eklentisi kullanilabilir.
  - Alternatif olarak Mermaid kodlari https://mermaid.live/ adresinde render edilebilir.
  - Mermaid kodlari `sequenceDiagram` satiri ile baslar.

## Use Case Diagram

PlantUML ile render edilebilir.

```plantuml
@startuml
left to right direction

actor Guest
actor "Registered User" as RegisteredUser
actor Admin

rectangle "Fanscore System" {
  usecase "Register" as UC_Register
  usecase "Login" as UC_Login
  usecase "View Player" as UC_ViewPlayer
  usecase "Rate Player" as UC_RatePlayer
  usecase "Comment" as UC_Comment
  usecase "Create Tournament" as UC_CreateTournament
  usecase "Join Tournament" as UC_JoinTournament
  usecase "View Merchandise" as UC_ViewMerchandise
  usecase "Purchase Merchandise" as UC_PurchaseMerchandise
  usecase "Manage Players" as UC_ManagePlayers
  usecase "Moderate Comments" as UC_ModerateComments
  usecase "Suspend User" as UC_SuspendUser
}

Guest --> UC_Register
Guest --> UC_Login
Guest --> UC_ViewPlayer
Guest --> UC_ViewMerchandise

RegisteredUser --> UC_Login
RegisteredUser --> UC_ViewPlayer
RegisteredUser --> UC_RatePlayer
RegisteredUser --> UC_Comment
RegisteredUser --> UC_CreateTournament
RegisteredUser --> UC_JoinTournament
RegisteredUser --> UC_ViewMerchandise
RegisteredUser --> UC_PurchaseMerchandise

Admin --> UC_Login
Admin --> UC_ManagePlayers
Admin --> UC_ModerateComments
Admin --> UC_SuspendUser

UC_RatePlayer ..> UC_Login : <<include>>
UC_Comment ..> UC_Login : <<include>>
UC_CreateTournament ..> UC_Login : <<include>>
UC_JoinTournament ..> UC_Login : <<include>>
UC_PurchaseMerchandise ..> UC_Login : <<include>>
UC_ManagePlayers ..> UC_Login : <<include>>
UC_ModerateComments ..> UC_Login : <<include>>
UC_SuspendUser ..> UC_Login : <<include>>

UC_Comment ..> UC_RatePlayer : <<extend>>
UC_PurchaseMerchandise ..> UC_ViewMerchandise : <<extend>>
@enduml
```

## Sequence Diagram: Register / Login

```mermaid
sequenceDiagram
    actor User
    participant UI as Angular Auth Pages
    participant AuthService
    participant API as Auth API
    participant DB as Database
    participant Storage as Local Storage

    alt Register
        User->>UI: Enters registration information
        UI->>AuthService: register(payload)
        AuthService->>API: POST /api/Auth/register
        API->>DB: Validate and create user
        DB-->>API: User created
        API-->>AuthService: AuthResponse
        AuthService-->>UI: Registration success
        UI-->>User: Show success / redirect to login
    else Login
        User->>UI: Enters email and password
        UI->>AuthService: login(payload)
        AuthService->>API: POST /api/Auth/login
        API->>DB: Validate credentials
        DB-->>API: User and roles
        API-->>AuthService: Access token and refresh token
        AuthService->>Storage: Save tokens
        AuthService-->>UI: Login success
        UI-->>User: Redirect to home/profile
    end
```

## Sequence Diagram: Rate Player

```mermaid
sequenceDiagram
    actor RegisteredUser as Registered User
    participant PlayerPage as Player Page
    participant RatingPanel
    participant RatingService
    participant API as Rating API
    participant DB as Database

    RegisteredUser->>PlayerPage: Opens player detail page
    PlayerPage->>RatingPanel: Opens rating panel with playerId
    RatingPanel->>RatingService: checkCanVote(playerId, periodType)
    RatingService->>API: GET /api/Rating/can-vote
    API->>DB: Check previous vote for period
    DB-->>API: Vote availability
    API-->>RatingService: VoteAvailability
    RatingService-->>RatingPanel: Can vote / cannot vote

    alt User can vote
        RegisteredUser->>RatingPanel: Enters rating and optional comment
        RatingPanel->>RatingService: createRating(payload)
        RatingService->>API: POST /api/Rating
        API->>DB: Save rating and comment
        DB-->>API: Rating saved
        API-->>RatingService: RatingResult
        RatingService-->>RatingPanel: Submit success
        RatingPanel-->>PlayerPage: submitted event
        PlayerPage->>PlayerPage: Refresh player rating data
        RatingPanel-->>RegisteredUser: Show success message
    else User cannot vote
        RatingPanel-->>RegisteredUser: Show next available vote time
    end
```

## Sequence Diagram: Create Tournament

```mermaid
sequenceDiagram
    actor RegisteredUser as Registered User
    participant UI as Create Tournament Page
    participant TournamentService
    participant API as Tournament API
    participant DB as Database

    RegisteredUser->>UI: Fills tournament form
    UI->>UI: Validate required fields

    alt Form is valid
        UI->>TournamentService: createTournament(model)
        TournamentService->>API: POST /api/Tournament
        API->>DB: Insert tournament
        DB-->>API: Tournament detail
        API-->>TournamentService: TournamentDetail
        TournamentService-->>UI: Created tournament
        UI->>UI: Reset form
        UI-->>RegisteredUser: Show success message
    else Form is invalid
        UI-->>RegisteredUser: Show validation error
    end
```

## Sequence Diagram: Merchandise Purchase

Bu akista urun listeleme mevcut Product API ile, satin alma ise sistem tasarimi seviyesinde Order/Payment servisleri ile gosterilmistir.

```mermaid
sequenceDiagram
    actor RegisteredUser as Registered User
    participant MerchPage as Merchandise Page
    participant ProductPage as Product Detail Page
    participant ProductService
    participant ProductAPI as Product API
    participant OrderAPI as Order API
    participant Payment as Payment Gateway
    participant DB as Database

    RegisteredUser->>MerchPage: Opens merchandise page
    MerchPage->>ProductService: getAllProducts()
    ProductService->>ProductAPI: GET /api/Product
    ProductAPI->>DB: Load product list
    DB-->>ProductAPI: Products
    ProductAPI-->>ProductService: ProductList[]
    ProductService-->>MerchPage: Display products

    RegisteredUser->>ProductPage: Selects a product
    ProductPage->>ProductService: getProductById(productId)
    ProductService->>ProductAPI: GET /api/Product/{productId}
    ProductAPI->>DB: Load product detail
    DB-->>ProductAPI: ProductDetail
    ProductAPI-->>ProductService: ProductDetail
    ProductService-->>ProductPage: Display product detail

    RegisteredUser->>ProductPage: Confirms purchase
    ProductPage->>OrderAPI: POST /api/Order
    OrderAPI->>DB: Create pending order
    DB-->>OrderAPI: Order id
    OrderAPI->>Payment: Request payment authorization

    alt Payment approved
        Payment-->>OrderAPI: Approved
        OrderAPI->>DB: Mark order as paid and reduce stock
        DB-->>OrderAPI: Order completed
        OrderAPI-->>ProductPage: Purchase success
        ProductPage-->>RegisteredUser: Show confirmation
    else Payment failed
        Payment-->>OrderAPI: Failed
        OrderAPI->>DB: Mark order as failed
        OrderAPI-->>ProductPage: Purchase failed
        ProductPage-->>RegisteredUser: Show error message
    end
```

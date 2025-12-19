# SOLID Principles and YDNI (You Do Need It).

A counterpoint to YAGNI: Understanding when you actually do need abstraction, planning, and proper architecture from the start.

## Introduction.

Every developer knows YAGNI—"You Aren't Gonna Need It." It's the battle cry against over-engineering. But there's a dangerous flip side: sometimes, you absolutely do need it, and pretending otherwise creates technical debt that compounds exponentially.

Welcome to YDNI: You Do Need It.

## The SOLID Foundation.

### Revisiting SOLID Through the YDNI Lens.

SOLID principles aren't bureaucratic overhead—they're battle-tested wisdom encoded into five letters. Let's examine each through the lens of what happens when you *don't* apply them.

### S - Single Responsibility Principle.

**YAGNI Says:** "This class only does two things, why split it?"

**YDNI Response:** Because next week it'll do four things, then eight, then you'll have a 2000-line God class that nobody wants to touch.

```typescript
// YAGNI approach - seems simple.
class UserManager {
  createUser(data: UserData) { /* ... */ }
  validateEmail(email: string) { /* ... */ }
  sendWelcomeEmail(user: User) { /* ... */ }
  updateSubscription(user: User) { /* ... */ }
  generateInvoice(user: User) { /* ... */ }
  // ... 47 more methods added over 2 years.
}

// YDNI approach - you DO need separation.
class UserRepository { /* CRUD operations */ }
class EmailValidator { /* validation logic */ }
class NotificationService { /* email sending */ }
class SubscriptionManager { /* subscription logic */ }
class InvoiceGenerator { /* billing logic */ }
```

### O - Open/Closed Principle.

**YAGNI Says:** "We only have one payment method, why build for extensibility?"

**YDNI Response:** Because your PM is already scheduling the meeting about adding Apple Pay.

```typescript
// YAGNI approach.
function processPayment(amount: number, cardNumber: string) {
  // Direct Stripe integration.
  stripe.charge(cardNumber, amount);
}

// YDNI approach.
interface PaymentProcessor {
  process(payment: Payment): Promise<PaymentResult>;
}

class StripeProcessor implements PaymentProcessor { /* ... */ }
class ApplePayProcessor implements PaymentProcessor { /* ... */ }
class CryptoProcessor implements PaymentProcessor { /* ... */ }
```

### L - Liskov Substitution Principle.

**YAGNI Says:** "Inheritance is fine, we'll fix edge cases as they come."

**YDNI Response:** Those edge cases become runtime explosions when subclasses violate parent contracts.

```typescript
// Violates LSP - Square changes Rectangle's invariants.
class Rectangle {
  constructor(public width: number, public height: number) {}
  setWidth(w: number) { this.width = w; }
  setHeight(h: number) { this.height = h; }
  area() { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w: number) {
    this.width = w;
    this.height = w; // Surprise! This breaks expectations.
  }
}

// YDNI - Use composition or separate hierarchies.
interface Shape {
  area(): number;
}

class Rectangle implements Shape { /* ... */ }
class Square implements Shape { /* ... */ }
```

### I - Interface Segregation Principle.

**YAGNI Says:** "One interface is simpler than many."

**YDNI Response:** Until every implementation is forced to throw `NotImplementedException` for methods they don't support.

```typescript
// Fat interface - YAGNI trap.
interface DataStore {
  read(id: string): Data;
  write(data: Data): void;
  delete(id: string): void;
  search(query: string): Data[];
  backup(): void;
  restore(backup: Backup): void;
  replicate(target: DataStore): void;
}

// YDNI - Segregated interfaces.
interface Readable { read(id: string): Data; }
interface Writable { write(data: Data): void; }
interface Deletable { delete(id: string): void; }
interface Searchable { search(query: string): Data[]; }

class SimpleCache implements Readable, Writable { /* ... */ }
class SearchableDatabase implements Readable, Writable, Searchable { /* ... */ }
```

### D - Dependency Inversion Principle.

**YAGNI Says:** "Just import the concrete class, abstractions are overkill."

**YDNI Response:** Good luck writing tests when every class directly instantiates its dependencies.

```typescript
// Concrete dependency - untestable.
class OrderProcessor {
  process(order: Order) {
    const db = new PostgresDatabase(); // Hardcoded!
    const emailer = new SendGridEmailer(); // Hardcoded!
    db.save(order);
    emailer.send(order.customer.email, 'Order confirmed');
  }
}

// YDNI - Dependency injection.
class OrderProcessor {
  constructor(
    private db: Database,
    private emailer: Emailer
  ) {}

  process(order: Order) {
    this.db.save(order);
    this.emailer.send(order.customer.email, 'Order confirmed');
  }
}
```

## When YDNI Applies.

### The Decision Framework.

Not everything needs SOLID from day one. Here's how to decide:

**You Do Need It When:**

1. **The domain is well-understood.** You know what's coming.
2. **Multiple developers will touch it.** Team code needs structure.
3. **It's a core business capability.** Central systems get extended.
4. **Testing is a priority.** Testability requires abstractions.
5. **Regulatory requirements exist.** Compliance demands separation.

**YAGNI is Valid When:**

1. **It's a prototype.** Throw-away code is fine.
2. **You're genuinely uncertain.** Wait for clarity.
3. **It's isolated code.** No ripple effects from changes.
4. **Speed is existential.** Startup survival mode.

### The Cost Calculation.

```python
def should_apply_ydni(feature):
    """
    Calculate if upfront architecture is worth it.
    """
    probability_of_extension = estimate_extension_likelihood(feature)
    cost_of_later_refactor = calculate_refactor_cost(feature)
    cost_of_upfront_design = calculate_design_cost(feature)

    expected_cost_yagni = probability_of_extension * cost_of_later_refactor
    expected_cost_ydni = cost_of_upfront_design

    return expected_cost_ydni < expected_cost_yagni
```

## The YDNI Manifesto.

### Core Tenets.

1. **Technical Debt Has Interest.** Small shortcuts compound into massive refactoring projects.

2. **The Second System Syndrome is Real.** But so is the "we never have time to fix it" syndrome.

3. **Abstractions Enable Velocity.** Good architecture accelerates future development.

4. **Tests Are Features.** Testable code requires investment in design.

5. **Teams Change, Code Remains.** What's obvious to you today confuses the next developer.

### Practical Applications.

**Authentication & Authorization.**
You absolutely need proper separation. Security cross-cuts everything and needs clean boundaries.

**Data Access Layer.**
You do need a repository pattern. Database changes are inevitable.

**External Service Integration.**
You do need adapters. Third-party APIs change constantly.

**Configuration Management.**
You do need a proper config system. Environment-specific behavior is guaranteed.

**Logging & Monitoring.**
You do need structured logging from day one. Debugging production is hard enough.

## Balancing YAGNI and YDNI.

### The Pragmatic Path.

The goal isn't to apply SOLID everywhere blindly. It's to recognize when simplicity is a trap.

**Guidelines:**

1. **Start Simple, But Not Stupid.** Simple doesn't mean coupled.
2. **Design for the Next Developer.** That developer might be you in six months.
3. **Trust Experienced Intuition.** Senior developers have seen patterns before.
4. **Document Architectural Decisions.** Explain *why* you chose YAGNI or YDNI.
5. **Revisit Regularly.** What was YAGNI yesterday might be YDNI today.

## Conclusion.

YAGNI and YDNI aren't opposing forces—they're complementary tools. The wisdom lies in knowing which to apply.

When you're tempted to skip abstraction, ask yourself: "If I'm right that we won't need it, what did the abstraction cost? If I'm wrong, what's the cost of adding it later?"

Often, the answer makes the choice clear: You Do Need It.

---

*Written by the NGEK TECH engineering team.*

---

*Disclaimer: This blog contains proprietary concepts and frameworks developed by NGEK TECH. YDNI is our proprietary term representing our software engineering philosophy.*

# Contributing Guidelines

## Development Workflow

### 1. TDD Approach

This project follows Test-Driven Development (TDD) principles:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code while keeping tests green

### 2. Commit Guidelines

- Write clear, descriptive commit messages
- Follow conventional commit format when possible
- Include AI co-authorship when AI tools were used

Example:
```
feat: Add search functionality for sweets

Implemented search by name, category, and price range.
Added validation and error handling.

Co-authored-by: AI Tool Name <AI@users.noreply.github.com>
```

### 3. Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Follow SOLID principles

### 4. Testing

- Write tests before implementing features
- Aim for high test coverage (>80%)
- Test edge cases and error scenarios
- Keep tests readable and maintainable

### 5. Pull Request Process

1. Create a feature branch
2. Write tests first (TDD)
3. Implement the feature
4. Ensure all tests pass
5. Update documentation if needed
6. Submit pull request with clear description

## AI Usage Guidelines

When using AI tools:

1. **Be Transparent**: Always document AI usage in commits
2. **Review Code**: Never blindly accept AI-generated code
3. **Understand**: Ensure you understand all AI-suggested code
4. **Test**: Thoroughly test AI-generated code
5. **Customize**: Adapt AI suggestions to project needs

## Questions?

Feel free to open an issue for questions or clarifications.


import Todo from '../models/Todo.js';

function normalizeTitle(value) {
  return String(value ?? '').trim();
}

export async function getTodos(req, res, next) {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

export async function createTodo(req, res, next) {
  try {
    const title = normalizeTitle(req.body?.title);

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const title = normalizeTitle(req.body?.title);

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

export async function toggleTodo(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

export async function setTodoCompleted(req, res, next) {
  try {
    const { id } = req.params;
    const completed = Boolean(req.body?.completed);

    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    next(error);
  }
}

export async function deleteCompletedTodos(req, res, next) {
  try {
    const result = await Todo.deleteMany({ completed: true });
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    next(error);
  }
}

export async function deleteAllTodos(req, res, next) {
  try {
    const result = await Todo.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    next(error);
  }
}

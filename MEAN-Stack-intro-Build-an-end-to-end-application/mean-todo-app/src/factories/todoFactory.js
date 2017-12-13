import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])
.factory('todoFactory', () => {
	function createTask ($scope, flags) {
		flags.CREATE_HAS_INPUT = false;
		$scope.createTaskInput = '';
	};

	function onEditUpdateClick(todo) {
		todo.task = todo.updatedTask;
		todo.isEditing = false;
	};

	function onCompletedClick(todo) {
		todo.isCompleted = !todo.isCompleted;
	};

	function onEditClick(todo) {
		todo.isEditing = true;
	}

	function onEditCancelClick(todo) {
		todo.isEditing = false;
	}

	function onDeleteClick ($scope, todoToDelete) {
		_.remove($scope.todos, xyz => xyz.task === todoToDelete.task);
	}

	function watchCreateTaskInput(flags, $scope, val) {
		if (!val && flags.CREATE_HAS_INPUT) {
			$scope.todos.pop();
			flags.CREATE_HAS_INPUT = false;
		}else if (val && !flags.CREATE_HAS_INPUT) {
			$scope.todos.push({task: val, isCompleted: false});
			flags.CREATE_HAS_INPUT = true;
		} else if (val && flags.CREATE_HAS_INPUT) {
			$scope.todos[$scope.todos.length - 1].task = val;
		}
	}

	return {
		createTask,
		onEditUpdateClick,
		onCompletedClick,
		onEditClick,
		onEditCancelClick,
		onDeleteClick,
		watchCreateTaskInput
	}
});

export default todoFactory;

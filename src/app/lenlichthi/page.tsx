"use client"
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Student {
  id: number;
  name: string;
}

interface ExamFormData {
  examName: string;
  examTime: string;
  examRoom: string;
  students: Student[];
}

const ScheduleExamForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ExamFormData>();
  const [students, setStudents] = useState<Student[]>([]);
  const [studentIdCounter, setStudentIdCounter] = useState<number>(1);

  const onSubmit: SubmitHandler<ExamFormData> = (data: { students: Student[]; }) => {
    data.students = students;
    console.log(data);
    // Handle form submission, e.g., send data to an API
  };

  const handleAddStudent = () => {
    const studentName = prompt("Nhập tên sinh viên:");
    if (studentName) {
      setStudents([...students, { id: studentIdCounter, name: studentName }]);
      setStudentIdCounter(studentIdCounter + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Lập Lịch Thi</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Exam Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Tên Kỳ Thi</label>
          <input
            type="text"
            {...register("examName", { required: true })}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Nhập tên kỳ thi"
          />
          {errors.examName && <p className="text-red-500">Tên kỳ thi là bắt buộc.</p>}
        </div>

        {/* Student List */}
        <div className="mb-4">
          <label className="block text-gray-700">Danh Sách Sinh Viên</label>
          <button
            type="button"
            onClick={handleAddStudent}
            className="mt-1 mb-2 p-2 bg-blue-500 text-white rounded"
          >
            Thêm Sinh Viên
          </button>
          <ul className="list-disc ml-6">
            {students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>

        {/* Exam Time */}
        <div className="mb-4">
          <label className="block text-gray-700">Thời Gian Thi</label>
          <input
            type="datetime-local"
            {...register("examTime", { required: true })}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.examTime && <p className="text-red-500">Thời gian thi là bắt buộc.</p>}
        </div>

        {/* Exam Room */}
        <div className="mb-4">
          <label className="block text-gray-700">Phòng Thi</label>
          <input
            type="text"
            {...register("examRoom", { required: true })}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Nhập phòng thi"
          />
          {errors.examRoom && <p className="text-red-500">Phòng thi là bắt buộc.</p>}
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Lập Lịch
        </button>
      </form>
    </div>
  );
};

export default ScheduleExamForm;

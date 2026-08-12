export type Course = {
  name: string
  color: string
}

export type Student = {
  id: string
  name: string
  avatar: string
  gpa: number
  credits: number
  major: string
  courses: Course[]
  isFavorite: boolean
}

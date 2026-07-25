import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    user_id = Column(String, nullable=False)
    user_email = Column(String, nullable=False)
    action = Column(String(100), nullable=False)  # READ, SCAN, EXPORT, APPROVE, DELETE
    resource_target = Column(String(255), nullable=False)
    ip_address = Column(String(100), default="127.0.0.1")
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class WebhookConfig(Base):
    __tablename__ = "webhook_configs"

    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    target_url = Column(String(500), nullable=False)
    secret = Column(String(255), nullable=False)
    events = Column(JSON, default=list)  # ["risk.changed", "cve.detected", "sanctions.flagged"]
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class InvestigationTask(Base):
    __tablename__ = "investigation_tasks"

    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    company_id = Column(String, nullable=False)
    title = Column(String(255), nullable=False)
    assignee = Column(String(255), nullable=False)
    priority = Column(String(50), default="Medium")  # Critical, High, Medium, Low
    status = Column(String(50), default="In Progress")  # To Do, In Progress, Review, Completed
    due_date = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class CommentRecord(Base):
    __tablename__ = "comment_records"

    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False)
    target_id = Column(String, nullable=False)  # company_id or task_id
    author_name = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class ApprovalWorkflow(Base):
    __tablename__ = "approval_workflows"

    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False)
    report_title = Column(String(255), nullable=False)
    requested_by = Column(String(255), nullable=False)
    approved_by = Column(String(255), nullable=True)
    status = Column(String(50), default="Pending Approval")  # Pending Approval, Approved, Rejected
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class ApiKeyRecord(Base):
    __tablename__ = "api_key_records"

    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False)
    key_name = Column(String(100), nullable=False)
    api_key = Column(String(255), unique=True, nullable=False)
    rate_limit = Column(Integer, default=10000)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
